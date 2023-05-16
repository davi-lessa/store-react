import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnimatedRoutes from 'utils/AnimatedRoutes'

export default function AppRouter() {
  return (
    <Router>
      <AnimatePresence>
        <AnimatedRoutes></AnimatedRoutes>
      </AnimatePresence>
    </Router>
  )
}
