import { PageHeader } from '@/components/page-header';
import { PaymentRecorder } from './components/payment-recorder';

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        title="Record Patient Payment"
        description="Use the form below to log a new payment."
      />
      <PaymentRecorder />
    </>
  );
}
