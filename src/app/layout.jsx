import '@styles/globals.css'

export const metadata = {
  title: 'Commute MBTA',
  description: 'Commuting tool for Bostonians' 
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body className='bg-neutral-700'>
        <div className='main'>
          
        </div>

        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout