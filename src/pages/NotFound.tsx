import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';

export default function NotFound() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      subtitle="Let's get you back to something useful."
      action={<Link to="/" className="btn-primary focus-ring mt-2">Back to Home</Link>}
    />
  );
}
