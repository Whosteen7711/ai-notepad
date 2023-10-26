import CreateNote from '@/components/create-note'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { UserButton, auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type DashboardProps = {}
const Dashboard = async (props: DashboardProps) => {
  const { userId } = auth()
  const entries = await db
    .select()
    .from(notes)
    .where(eq(notes.username, userId!))

  return (
    <div className="bgGradient">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14"></div>
        {/* header */}
        <div className="flex justify-around items-center flex-col sm:flex-row">
          <Link href={'/'}>
            <Button className="bg-green-600">
              <ArrowLeft className=" mr-1 w-4 h-4 " strokeWidth={3} />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <UserButton />
        </div>
        {/* /header */}
        <div className="h-8"></div>
        {/* content */}
        {entries.length === 0 && (
          <div className="text-center">
            <h2>You have no notes yet!</h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <CreateNote />
          {entries.map((entry) => {
            return (
              <a href={`notebook/${entry.id}`} key={entry.id}>
                <div className="flex flex-col border border-stone-300 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
                  <Image
                    width={400}
                    height={200}
                    alt={entry.title}
                    src={entry.imageUrl || ''}
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {entry.title}
                    </h3>
                    <p>
                      {new Date(entry.createdAt).toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
