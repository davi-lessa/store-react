import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnimatedRoutes from 'routes/AnimatedRoutes'
import Cart from 'components/Cart'
import Header from 'components/Header'

export default function AppRouter() {
  return (
    <Router>
      <Cart></Cart>
      <AnimatePresence>
        <AnimatedRoutes></AnimatedRoutes>
      </AnimatePresence>
    </Router>
  )
}
