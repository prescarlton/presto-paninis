import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Button } from "../components/ui/button";

interface IPageLayout {
  children: ReactNode;
  title: string;
}

const PageLayout = ({ children, title }: IPageLayout) => {
  const router = useRouter();
  const onClickHome = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{title} | Presto Paninis</title>
      </Head>
      <div className="flex min-h-screen flex-col">
        <div className="flex justify-between py-4 px-4">
          <Button variant="ghost" onClick={onClickHome}>
            Presto Paninis
          </Button>
          <UserButton afterSignOutUrl="/sign-in" showName />
        </div>
        <main className="flex flex-1 flex-col  px-4">{children}</main>
      </div>
    </>
  );
};

export default PageLayout;
