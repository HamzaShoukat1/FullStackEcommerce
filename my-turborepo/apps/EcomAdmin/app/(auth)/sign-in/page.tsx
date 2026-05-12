import SigninDialog from '@/components/dialogs/Signindialog'


function page() {
  return (
    <div className='min-h-screen flex items-center justify-cente'>
      <SigninDialog open={true} redirectUrl="/" />
    </div>
  )
}

export default page