import { cn } from '@/libs/utils';

import { DemoCreateAccount } from '@/components/example/card/CreateAccount';
import { DemoPaymentMethod } from '@/components/example/card/PaymentMethod';
import { DemoTeamMembers } from '@/components/example/card/TeamMembers';
import { DemoShareDocument } from '@/components/example/card/ShareDocument';
import { DemoNotifications } from '@/components/example/card/Notifications';
import { DemoReportAnIssue } from '@/components/example/card/ReportAnIssue';
import { DemoGithub } from '@/components/example/card/GithubCard';
import { DemoCookieSettings } from '@/components/example/card/CookieSettings';

function DemoContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-center [&>div]:w-full', className)} {...props} />;
}

export default function CardsPage() {
  return (
    <div className='grid items-start justify-center gap-6 rounded-lg lg:grid-cols-2'>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <DemoContainer>
          <DemoCreateAccount />
        </DemoContainer>
        <DemoContainer>
          <DemoPaymentMethod />
        </DemoContainer>
        <DemoContainer>
          <DemoTeamMembers />
        </DemoContainer>
        <DemoContainer>
          <DemoShareDocument />
        </DemoContainer>
      </div>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <DemoContainer>
          <DemoNotifications />
        </DemoContainer>
        <DemoContainer>
          <DemoReportAnIssue />
        </DemoContainer>
        <DemoContainer>
          <DemoGithub />
        </DemoContainer>
        <DemoContainer>
          <DemoCookieSettings />
        </DemoContainer>
      </div>
    </div>
  );
}
