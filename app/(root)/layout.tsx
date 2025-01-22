import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authResult = await auth();
  const { userId } = authResult;

  if (!userId) {
    redirect('sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
