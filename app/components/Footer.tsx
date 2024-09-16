import Link from 'next/link'

export default function Footer() {
  return (
      <footer className="bg-gray-800 bg-opacity-80 text-white p-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About Plantify</h3>
          <p>Plantify is an AI-powered plant identification tool that helps you discover and learn about various plant species.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-green-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-green-300">Terms of Service</Link></li>
            <li><Link href="/faq" className="hover:text-green-300">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Email: kiruthikpurpose@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: Coimbatore, Tamil Nadu, India</p>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t border-green-700">
        <p>&copy; 2024 Kiruthik. All rights reserved.</p>
      </div>
    </footer>
  )
}