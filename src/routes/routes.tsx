import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnimatedRoutes from 'routes/AnimatedRoutes'

export default function AppRouter() {
  return (
    <Router>
      <AnimatePresence>
        <AnimatedRoutes></AnimatedRoutes>
      </AnimatePresence>
    </Router>
  )
}
