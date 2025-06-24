import { navigateToBusinessBooking, useCrossPlatformNavigation } from '../shared/navigation/useNavigation';

// Example of how to update an existing component to use Solito navigation
export function ExampleServiceCard() {
  const navigation = useCrossPlatformNavigation();

  const handleBookNow = () => {
    // Navigate to booking details using Solito
    navigateToBusinessBooking(navigation, 'business-123');
  };

  const handleViewService = () => {
    // Navigate to service details using Solito
    navigation.push('/(services)/health-wellness');
  };

  return (
    <div>
      <h3>Health & Wellness Service</h3>
      <button onClick={handleViewService}>View Service</button>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
}

// Example of how to update the existing ServiceCard component to use Solito
export function updateServiceCardWithSolito() {
  /*
  In your existing ServiceCard component (app/expo/app/_components/ServiceCard.tsx),
  replace the current navigation logic with:

  import { useCrossPlatformNavigation } from '@shared/navigation/useNavigation';

  export default function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
    const navigation = useCrossPlatformNavigation();

    const handlePress = () => {
      if (service.isBookable) {
        // Navigate to booking page
        navigation.push({
          pathname: '/(booking)/details',
          params: { businessId: service.id }
        });
      } else {
        // Navigate to service category
        navigation.push(service.route || '/services');
      }
    };

    // Rest of your component...
  }
  */
}
