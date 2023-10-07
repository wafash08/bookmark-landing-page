import { useState } from "react";
import { BookmarkLogoIcon, FacebookIcon, TwitterIcon } from "./icons";
import clsx from "clsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className='px-8 py-10'>
          <div className='max-w-[1200px] mx-auto flex flex-col lg:flex-row-reverse gap-10 lg:min-h-[500px]'>
            <figure id='illustration-hero' className='relative flex-1'>
              <img
                src='/images/illustration-hero.svg'
                alt='A simple bookmark manager'
                className='lg:hidden'
              />
            </figure>
            <div className='flex-1 text-center lg:text-left grid gap-6 lg:flex lg:flex-col lg:justify-center'>
              <h1 className='text-neutral-very-dark-blue text-3xl lg:text-5xl font-bold'>
                A Simple Bookmark Manager
              </h1>
              <p className='text-neutral-grayish-blue font-light lg:text-lg lg:max-w-md'>
                A clean and simple interface to organize your favourite
                websites. Open a new browser tab and see your sites load
                instantly. Try it for free.
              </p>
              <div className='flex justify-center lg:justify-start gap-6'>
                <CTAButton variant='blue'>Get it on Chrome</CTAButton>
                <CTAButton variant='white'>Get it on Firefox</CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Header() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function handleOpen() {
    setIsExpanded(true);
  }
  function handleClose() {
    setIsExpanded(false);
  }
  return (
    <header className='px-8'>
      <div className='flex items-center justify-between h-24 max-w-[1200px] mx-auto'>
        <a
          href='#'
          title='Go to bookmark home'
          className={clsx(isExpanded ? "z-20" : "z-0")}
        >
          <span className='sr-only'>Bookmark Logo</span>
          <BookmarkLogoIcon isExpanded={isExpanded} />
        </a>
        {/* tombol hamburger */}
        <div
          className={clsx(
            "flex items-center md:hidden",
            isExpanded ? "z-20" : "z-0"
          )}
        >
          {isExpanded ? (
            <CloseButton handleClose={handleClose} />
          ) : (
            <HamburgerButton handleOpen={handleOpen} />
          )}
        </div>
        {/* Mobile Navigation */}
        <MobileNavigation isExpanded={isExpanded} />
        {/* desktop navigation */}
        <DesktopNavigation />
      </div>
    </header>
  );
}

function HamburgerButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <button
      type='button'
      onClick={handleOpen}
      className='w-10 h-10 rounded-full flex items-center justify-end'
    >
      <span className='sr-only'>Open Menu</span>
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='15'>
        <path
          fill='#242A45'
          fillRule='evenodd'
          d='M0 0h18v3H0V0zm0 6h18v3H0V6zm0 6h18v3H0v-3z'
        />
      </svg>
    </button>
  );
}

function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <button
      type='button'
      onClick={handleClose}
      className='w-10 h-10 rounded-full flex items-center justify-end'
    >
      <span className='sr-only'>Close Menu</span>
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15'>
        <path
          fill='#FFF'
          fillRule='evenodd'
          d='M8 5.379L13.303.075l2.122 2.122L10.12 7.5l5.304 5.303-2.122 2.122L8 9.62l-5.303 5.304-2.122-2.122L5.88 7.5.575 2.197 2.697.075 8 5.38z'
        />
      </svg>
    </button>
  );
}

const NAVIGATION_LIST: NavigationItemProps[] = [
  { href: "#", label: "features" },
  { href: "#", label: "pricing" },
  { href: "#", label: "contact" },
  { href: "#", label: "login" },
];

function MobileNavigation({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div
      className={clsx(
        "z-10 md:hidden absolute w-full h-screen bg-neutral-very-dark-blue/90 top-0 left-0 pt-24 px-8 pb-14 grid justify-between grid-rows-2 grid-cols-1",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "translate-x-0 visible" : "-translate-x-full invisible"
      )}
    >
      <nav className='row-span-full text-white'>
        <ul>
          {NAVIGATION_LIST.map(({ href, label }) => {
            return (
              <MobileNavigationItem key={label} href={href} label={label} />
            );
          })}
        </ul>
      </nav>
      <div>
        <ul className='flex justify-center items-center gap-10'>
          <li>
            <a href='#'>
              <span className='sr-only'>facebook</span>
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href='#'>
              <span className='sr-only'>twitter</span>
              <TwitterIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

type NavigationItemProps = {
  label: string;
  href: string;
};

function MobileNavigationItem({ href, label }: NavigationItemProps) {
  return (
    <li
      className={clsx(
        "first:border-t last:border-b-0 border-b border-neutral-grayish-blue",
        "w-full flex items-center justify-center py-3"
      )}
    >
      <a
        href={href}
        className={clsx(
          "uppercase tracking-widest text-xl font-light transition-colors duration-300 ease-in-out",
          "flex w-full justify-center py-2 hover:text-primary-soft-red",
          label === "login"
            ? "border-2 border-white rounded hover:border-primary-soft-red"
            : ""
        )}
      >
        {label}
      </a>
    </li>
  );
}

function DesktopNavigation() {
  return (
    <nav className='hidden md:block'>
      <ul className='flex items-center gap-10'>
        {NAVIGATION_LIST.map(({ href, label }) => {
          return (
            <DesktopNavigationItem key={label} href={href} label={label} />
          );
        })}
      </ul>
    </nav>
  );
}

function DesktopNavigationItem({ href, label }: NavigationItemProps) {
  return (
    <li>
      <a
        href={href}
        className={clsx(
          "uppercase font-light tracking-widest text-sm transition-colors duratio300 ease-in-out",
          label === "login"
            ? "px-7 py-3 rounded border border-primary-soft-red shadow-md bg-primary-soft-red text-white hover:bg-white hover:text-primary-soft-red"
            : "hover:text-primary-soft-red"
        )}
      >
        {label}
      </a>
    </li>
  );
}

function CTAButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "blue" | "white";
}) {
  return (
    <button
      type='button'
      className={clsx(
        "px-4 py-3 rounded shadow-xl text-sm transition-colors duration-300 ease-in-out",
        variant === "blue" &&
          "text-white bg-primary-soft-blue hover:bg-white hover:text-primary-soft-blue border border-primary-soft-blue",
        variant === "white" &&
          "text-neutral-grayish-blue bg-white border border-white hover:border-neutral-grayish-blue"
      )}
    >
      {children}
    </button>
  );
}
