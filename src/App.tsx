import { useCallback, useEffect, useState } from "react";
import {
  BookmarkLogoIcon,
  ChromeIcon,
  FacebookIcon,
  FirefoxIcon,
  OperaIcon,
  TwitterIcon,
} from "./icons";
import clsx from "clsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className='px-8 my-24'>
          <div className='max-w-[1100px] mx-auto flex flex-col lg:flex-row-reverse gap-10 lg:min-h-[500px]'>
            <figure id='illustration-hero' className='relative flex-1'>
              <img
                src='/images/illustration-hero.svg'
                alt='A simple bookmark manager'
                className='lg:hidden'
              />
            </figure>
            <div className='flex-1 text-center lg:text-left grid gap-6 lg:flex lg:flex-col lg:justify-center'>
              <h1 className='text-neutral-very-dark-blue text-3xl md:text-5xl font-bold'>
                A Simple Bookmark Manager
              </h1>
              <p className='text-neutral-grayish-blue font-light lg:text-lg lg:max-w-md'>
                A clean and simple interface to organize your favourite
                websites. Open a new browser tab and see your sites load
                instantly. Try it for free.
              </p>
              <div className='flex justify-center lg:justify-start gap-4 lg:gap-6'>
                <CTAButton variant='blue'>Get it on Chrome</CTAButton>
                <CTAButton variant='white'>Get it on Firefox</CTAButton>
              </div>
            </div>
          </div>
        </section>

        <section className='px-8 my-24'>
          <div className='max-w-[1100px] mx-auto grid gap-8 md:gap-16'>
            <div className='text-center'>
              <h2 className='text-neutral-very-dark-blue text-2xl md:text-3xl font-bold'>
                Features
              </h2>
              <p className='text-neutral-grayish-blue mt-4 md:mt-6 max-w-lg md:mx-auto lg:text-lg'>
                Our aim is to make it quick and easy for you to access your
                favourite websites. Your bookmarks sync between your devices so
                you can access them on the go.
              </p>
            </div>

            <FeatureList />
          </div>
        </section>

        <section className='px-8 my-24 lg:my-36'>
          <div className='grid gap-10 lg:gap-14 max-w-[1100px] mx-auto'>
            <div className='text-center'>
              <h2 className='text-neutral-very-dark-blue font-bold text-2xl md:text-3xl'>
                Download the extension
              </h2>
              <p className='text-neutral-grayish-blue mt-4 max-w-lg mx-auto lg:text-lg'>
                We’ve got more browsers in the pipeline. Please do let us know
                if you’ve got a favourite you’d like us to prioritize.
              </p>
            </div>

            <ExtensionList />
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

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [isExpanded]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setIsExpanded(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <header className='px-8'>
      <div className='flex items-center justify-between h-24 max-w-[1100px] mx-auto'>
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
        <MobileNavigation isExpanded={isExpanded} handleClose={handleClose} />
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

function MobileNavigation({
  isExpanded,
  handleClose,
}: {
  isExpanded: boolean;
  handleClose: () => void;
}) {
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
              <MobileNavigationItem
                key={label}
                href={href}
                label={label}
                handleClose={handleClose}
              />
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
  handleClose?: () => void;
};

function MobileNavigationItem({
  href,
  label,
  handleClose,
}: NavigationItemProps) {
  return (
    <li
      className={clsx(
        "first:border-t last:border-b-0 border-b border-neutral-grayish-blue",
        "w-full flex items-center justify-center py-3"
      )}
    >
      <a
        href={`${href}${label}`}
        className={clsx(
          "uppercase tracking-widest text-xl font-light transition-colors duration-300 ease-in-out",
          "flex w-full justify-center py-2 hover:text-primary-soft-red",
          label === "login"
            ? "border-2 border-white rounded hover:border-primary-soft-red"
            : ""
        )}
        onClick={handleClose}
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
  fullWidth,
}: {
  children: React.ReactNode;
  variant: "blue" | "white";
  fullWidth?: boolean;
}) {
  return (
    <button
      type='button'
      className={clsx(
        "py-3 rounded shadow-xl text-sm transition-colors duration-300 ease-in-out",
        variant === "blue" &&
          "text-white bg-primary-soft-blue hover:bg-white hover:text-primary-soft-blue border border-primary-soft-blue",
        variant === "white" &&
          "text-neutral-grayish-blue bg-white border border-white hover:border-neutral-grayish-blue",
        fullWidth ? "w-full" : "px-4"
      )}
    >
      {children}
    </button>
  );
}

type Image = {
  url: string;
  width: number;
  height: number;
};

const FEATURE_LIST: Record<
  FeatureListControl,
  { title: string; summary: string; image: Image }
> = {
  "simple bookmarking": {
    title: "Bookmark in one click",
    summary:
      "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
    image: {
      height: 346,
      url: "simple-bookmarking.svg",
      width: 536,
    },
  },
  "easy sharing": {
    title: "Share your bookmarks",
    summary:
      "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
    image: {
      height: 440,
      url: "easy-sharing.svg",
      width: 380,
    },
  },
  "speedy searching": {
    title: "Intelligent search",
    summary:
      "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
    image: {
      height: 416,
      url: "speedy-searching.svg",
      width: 478,
    },
  },
};

const FEATURE_LIST_CONTROLS = [
  "simple bookmarking",
  "speedy searching",
  "easy sharing",
] as const;

type FeatureListControl = (typeof FEATURE_LIST_CONTROLS)[number];

function FeatureList() {
  const [currentTabFeature, setCurrentTabFeature] = useState<number>(0);

  const selectedFeatureControl: FeatureListControl =
    FEATURE_LIST_CONTROLS[currentTabFeature];
  const { image, summary, title } = FEATURE_LIST[selectedFeatureControl];

  return (
    <div className='flex flex-col md:items-center gap-16'>
      <ul className='flex flex-col md:flex-row'>
        {FEATURE_LIST_CONTROLS.map((label, index) => {
          return (
            <li
              key={label}
              className='first:border-t first:border-b last:border-t last:border-b md:first:border-t-0 md:last:border-t-0 md:border-b border-neutral-grayish-blue flex justify-center'
            >
              <button
                type='button'
                name={label}
                className='relative py-4 md:px-12 capitalize text-neutral-grayish-blue transition-colors duration-300 ease-in-out hover:text-neutral-very-dark-blue'
                onClick={() => setCurrentTabFeature(index)}
              >
                {label}
                <div
                  className={clsx(
                    "absolute w-[90%] md:w-full h-1 bottom-0 left-1/2 -translate-x-1/2 scale-x-0 transition-transform duration-500 ease-in-out origin-left",
                    FEATURE_LIST_CONTROLS[currentTabFeature] === label
                      ? "bg-primary-soft-red scale-x-100"
                      : ""
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className='flex flex-col lg:flex-row items-center'>
        <figure className='flex-1 shrink-0 feature-image relative'>
          <img
            src={`/images/${image.url}`}
            alt={title}
            className='w-full'
            height={image.height}
            width={image.width}
          />
          <div className='absolute top-[3rem] lg:top-[5rem] right-[6rem] lg:right-[10rem] bg-primary-soft-blue w-[120%] h-[95%] -z-10 rounded-br-[5rem] lg:rounded-br-[10rem]' />
        </figure>

        <div className='flex-1 shrink-0 mt-24 lg:mt-0 flex flex-col gap-6 text-center lg:text-left'>
          <h3 className='text-neutral-very-dark-blue text-2xl md:text-3xl font-bold lg:ml-20'>
            {title}
          </h3>
          <p className='text-neutral-grayish-blue lg:ml-20'>{summary}</p>
          <div className='hidden lg:block lg:ml-20'>
            <CTAButton variant='blue'>More Info</CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const EXTENSION_LIST = [
  {
    label: "chrome",
    version: 62,
    icon: <ChromeIcon />,
  },
  {
    label: "firefox",
    version: 55,
    icon: <FirefoxIcon />,
  },
  {
    label: "opera",
    version: 46,
    icon: <OperaIcon />,
  },
];

function ExtensionList() {
  return (
    <ul className='flex flex-col lg:flex-row lg:items-start gap-10'>
      {EXTENSION_LIST.map(({ icon, label, version }) => {
        return (
          <li
            key={label}
            className='flex-1 shadow-lg rounded-xl lg:even:mt-16 lg:last:mt-32 border border-transparent border-dashed transition-colors duration-300 ease-in-out hover:border-neutral-grayish-blue'
          >
            <div className='flex flex-col p-10 gap-8 items-center'>
              {icon}
              <div className='text-center'>
                <h3 className='text-neutral-very-dark-blue text-xl mb-2 font-bold'>
                  Add to {label}
                </h3>
                <p className='text-neutral-grayish-blue'>
                  Minimum version {version}
                </p>
              </div>
            </div>
            <div className='p-8 border-t border-neutral-grayish-blue border-dashed flex'>
              <CTAButton variant='blue' fullWidth={true}>
                Add & Install Extension
              </CTAButton>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
