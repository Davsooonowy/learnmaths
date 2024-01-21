import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { ThemeProvider } from '@/components/theme-provider';
import Registration from "@/pages/Register.tsx";
import MatematykaDyskretna from "@/pages/MatematykaDyskretna.tsx";
import AnalizaMatematyczna from "@/pages/AnalizaMatematyczna.tsx";
import Algebra from "@/pages/Algebra.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <main className="mt-12 flex flex-1 justify-center">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Registration />} />
                            <Route path="/matematyka_dyskretna" element={<MatematykaDyskretna />} />
                            <Route path="/analiza_matematyczna" element={<AnalizaMatematyczna />} />
                            <Route path="/algebra" element={<Algebra />} />
                        </Routes>
                    </main>
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);
