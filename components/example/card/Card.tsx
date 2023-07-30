import Image from 'next/image';

import { cn } from '@/libs/utils';

import { DemoCreateAccount } from '@/components/example/card/CreateAccount';
// import { DemoCookieSettings } from '@/components/example/card/cookie-settings';
// import { DemoDatePicker } from '@/components/example/card/date-picker';
// import { DemoGithub } from '@/components/example/card/github-card';
// import { DemoNotifications } from '@/components/example/card/notifications';
// import { DemoPaymentMethod } from '@/components/example/card/payment-method';
// import { DemoReportAnIssue } from '@/components/example/card/report-an-issue';
// import { DemoShareDocument } from '@/components/example/card/share-document';
// import { DemoTeamMembers } from '@/components/example/card/team-members';

function DemoContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-center [&>div]:w-full', className)} {...props} />;
}

export default function CardsPage() {
  return (
    <div className='grid items-start justify-center gap-6 rounded-lg lg:grid-cols-2 xl:grid-cols-3'>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <DemoContainer>
          <DemoCreateAccount />
        </DemoContainer>
        <DemoContainer>{/* <DemoPaymentMethod /> */}</DemoContainer>
      </div>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <DemoContainer>{/* <DemoTeamMembers /> */}</DemoContainer>
        <DemoContainer>{/* <DemoShareDocument /> */}</DemoContainer>
        <DemoContainer>{/* <DemoDatePicker /> */}</DemoContainer>
        <DemoContainer>{/* <DemoNotifications /> */}</DemoContainer>
      </div>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1'>
        <DemoContainer>{/* <DemoReportAnIssue /> */}</DemoContainer>
        <DemoContainer>{/* <DemoGithub /> */}</DemoContainer>
        <DemoContainer>{/* <DemoCookieSettings /> */}</DemoContainer>
      </div>
    </div>
  );
}
