import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
  icon?: ReactNode;
  isHome?: boolean;
  [props: string]: any;
};

export default function NavLink({ children, className, href, icon, isHome, ...props }: Props) {
  const router = useRouter();
  const isDetailOrAddRoute =
    (router.pathname.includes(href) && router.pathname.includes('[id]')) ||
    (router.pathname.includes(href) && router.pathname.includes('add'));

  // const hrefSplit = href.split('/');
  // const lastHref = hrefSplit[hrefSplit.length - 1];
  // const pathnameSplit = router.pathname.split('/');
  // const lastPathname = pathnameSplit[pathnameSplit.length - 1];
  // console.log("href", href)
  // console.log("hrefSplit", hrefSplit)
  // console.log("lastHref", lastHref)
  // console.log("pathname", router.pathname)
  // console.log('pathnameSplit',  pathnameSplit);
  // console.log('lastPathname',  lastPathname);
  // console.log('------------------------------------');

  // this is for activate navlink component when in '/dashboard/*' pathname
  if (router.pathname.split('/')[1] == 'dashboard') {
    return (
      <Link
        passHref
        {...props}
        href={href}
        className={twMerge(
          'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
          isHome && 'bg-gray-100 font-medium text-sky-600 dark:bg-neutral-800 dark:text-sky-500',
          !isHome &&
            'text-gray-700 hover:bg-gray-100 hover:text-sky-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-sky-500',
          className
        )}
      >
        {icon}
        <div className='flex w-full justify-between'>{children}</div>
      </Link>
    );
  }

  return (
    <Link
      passHref
      {...props}
      href={href}
      className={twMerge(
        'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        isDetailOrAddRoute
          ? // current route that includes href
            // if route start with 'design', all pages inside design folder will activate this
            'bg-gray-100 font-medium text-sky-600 dark:bg-neutral-800 dark:text-sky-500'
          : router.pathname === href
          ? // current route that exactly match
            // pathname = /design, href = /design
            'bg-gray-100 font-medium text-sky-600 dark:bg-neutral-800 dark:text-sky-500 dark:hover:text-sky-500'
          : // not current route
            'text-gray-700 hover:bg-gray-100 hover:text-sky-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-sky-500',
        className
      )}
    >
      {icon}
      <div className='flex w-full justify-between'>{children}</div>
    </Link>
  );
}

type Other = {
  children: ReactNode;
  className?: string;
  href: string;
  icon?: ReactNode;
  [props: string]: any;
};

NavLink.external = ({ children, className, href, icon, ...props }: Other) => {
  return (
    <a
      {...props}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={twMerge(
        'flex w-full items-center justify-start gap-2 px-3 py-2 transition-all',
        'rounded text-sm font-medium text-gray-600 hover:text-sky-600 dark:text-neutral-300',
        'hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-sky-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};

NavLink.login = ({ children, className, href, icon, ...props }: Other) => {
  return (
    <Link
      {...props}
      passHref
      href={href}
      className={twMerge(
        'flex w-full items-center justify-start px-4 py-2 transition-all',
        'gap-2 rounded text-sm font-medium hover:bg-emerald-100 dark:hover:bg-neutral-800',
        'text-emerald-500 hover:text-emerald-600 dark:text-emerald-600 dark:hover:text-emerald-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

NavLink.logout = ({ children, className, href, icon, ...props }: Other) => {
  return (
    <Link
      {...props}
      passHref
      href={href}
      className={twMerge(
        'flex w-full items-center justify-start px-4 py-2 transition-all',
        'gap-2 rounded text-sm font-medium hover:bg-red-100 dark:hover:bg-neutral-800',
        'text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};
