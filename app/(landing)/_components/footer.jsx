import { Button } from '@/components/ui/button';
import Logo from './logo';

const Footer = () => {
  return (
    <div className="flex w-full p-6 items-center bg-background z-50">
      <Logo />
      <div className="flex w-full md:ml-auto justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">Privacy Policy</Button>
        <Button variant="ghost" size="sm">Terms and Conditions</Button>
      </div>
    </div>
  );
};

export default Footer;
