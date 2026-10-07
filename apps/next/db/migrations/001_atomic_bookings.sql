CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE businesses (
  id text PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE services (
  business_id text NOT NULL REFERENCES businesses(id),
  id text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  PRIMARY KEY (business_id, id)
);

CREATE TABLE resources (
  business_id text NOT NULL REFERENCES businesses(id),
  id text NOT NULL,
  name text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  PRIMARY KEY (business_id, id)
);

CREATE TABLE service_resources (
  business_id text NOT NULL,
  service_id text NOT NULL,
  resource_id text NOT NULL,
  PRIMARY KEY (business_id, service_id, resource_id),
  FOREIGN KEY (business_id, service_id) REFERENCES services(business_id, id),
  FOREIGN KEY (business_id, resource_id) REFERENCES resources(business_id, id)
);

CREATE TABLE bookings (
  id uuid PRIMARY KEY,
  idempotency_key uuid NOT NULL UNIQUE,
  request_hash char(64) NOT NULL,
  customer_id text,
  business_id text NOT NULL,
  service_id text NOT NULL,
  service_name text NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes BETWEEN 5 AND 480),
  status text NOT NULL DEFAULT 'confirmed'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at),
  UNIQUE (id, business_id, service_id, starts_at, ends_at),
  FOREIGN KEY (business_id, service_id) REFERENCES services(business_id, id)
);

CREATE INDEX bookings_business_start_idx ON bookings(business_id, starts_at);

CREATE TABLE booking_resources (
  booking_id uuid NOT NULL,
  business_id text NOT NULL,
  service_id text NOT NULL,
  resource_id text NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'confirmed'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  PRIMARY KEY (booking_id, resource_id),
  CHECK (ends_at > starts_at),
  FOREIGN KEY (booking_id, business_id, service_id, starts_at, ends_at)
    REFERENCES bookings(id, business_id, service_id, starts_at, ends_at),
  FOREIGN KEY (business_id, service_id, resource_id)
    REFERENCES service_resources(business_id, service_id, resource_id),
  CONSTRAINT booking_resource_no_overlap
    EXCLUDE USING gist (
      business_id WITH =,
      resource_id WITH =,
      tstzrange(starts_at, ends_at, '[)') WITH &&
    )
    WHERE (status IN ('pending', 'confirmed'))
);

INSERT INTO businesses (id, name) VALUES
  ('auto_001', 'auto_001'), ('auto_002', 'auto_002'),
  ('auto_003', 'auto_003'), ('auto_004', 'auto_004'),
  ('bpc_001', 'bpc_001'), ('bpc_002', 'bpc_002'),
  ('bpc_003', 'bpc_003'), ('bpc_004', 'bpc_004'),
  ('bpc_005', 'bpc_005'), ('bpc_006', 'bpc_006'),
  ('fs_001', 'fs_001'), ('fs_002', 'fs_002'), ('fs_003', 'fs_003'),
  ('fs_004', 'fs_004'), ('fs_005', 'fs_005'), ('fs_006', 'fs_006'),
  ('fs_007', 'fs_007'), ('fs_008', 'fs_008'), ('fs_009', 'fs_009'),
  ('fs_010', 'fs_010'), ('fs_011', 'fs_011'), ('fs_012', 'fs_012'),
  ('fs_013', 'fs_013'), ('fs_014', 'fs_014'), ('fs_015', 'fs_015'),
  ('fs_016', 'fs_016'), ('fs_017', 'fs_017'), ('fs_018', 'fs_018'),
  ('fs_019', 'fs_019'), ('fs_020', 'fs_020'),
  ('hs_001', 'hs_001'), ('hs_002', 'hs_002'), ('hs_003', 'hs_003'),
  ('hs_004', 'hs_004'), ('hs_005', 'hs_005'),
  ('hw_001', 'hw_001'), ('hw_002', 'hw_002'), ('hw_003', 'hw_003'),
  ('hw_004', 'hw_004'), ('hw_005', 'hw_005'), ('hw_006', 'hw_006'),
  ('tech_001', 'tech_001'), ('tech_002', 'tech_002'), ('tech_003', 'tech_003'),
  ('tech_004', 'tech_004'), ('tech_005', 'tech_005'),
  ('kwentong-barbero', 'Kwentong Barbero'),
  ('serene-escape-spa', 'Serene Escape Spa');

INSERT INTO services (business_id, id)
SELECT id, id FROM businesses;

INSERT INTO resources (business_id, id, name)
SELECT b.id, staff.id, staff.name
FROM businesses b
CROSS JOIN (VALUES
  ('1', 'Professional Staff'),
  ('2', 'Expert Technician'),
  ('3', 'Specialist'),
  ('4', 'Senior Professional')
) AS staff(id, name)
WHERE b.id NOT IN ('kwentong-barbero', 'serene-escape-spa');

INSERT INTO resources (business_id, id, name) VALUES
  ('kwentong-barbero', 'albert', 'Albert Flores'),
  ('kwentong-barbero', 'floyd', 'Floyd Miles'),
  ('kwentong-barbero', 'jerome', 'Jerome Bell'),
  ('kwentong-barbero', 'cameron', 'Cameron Williamson'),
  ('serene-escape-spa', 'albert', 'Albert Flores'),
  ('serene-escape-spa', 'floyd', 'Floyd Miles'),
  ('serene-escape-spa', 'jerome', 'Jerome Bell'),
  ('serene-escape-spa', 'cameron', 'Cameron Williamson');

INSERT INTO service_resources (business_id, service_id, resource_id)
SELECT s.business_id, s.id, r.id
FROM services s
JOIN resources r ON r.business_id = s.business_id;
