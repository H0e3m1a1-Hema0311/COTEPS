import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('ava@coteps.com');
  const [password, setPassword] = useState('password123');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password);
    navigate('/explorer');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, rgba(255,122,26,0.18), transparent 35%), linear-gradient(135deg, #05070b 0%, #11151d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ width: 'min(460px, 100%)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '0.16em', marginBottom: '0.25rem' }}>COTEPS</div>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Premium food delivery with wellness and game rewards.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Email or username</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><input type="checkbox" /> Remember me</label>
            <a href="#" style={{ color: 'var(--accent)' }}>Forgot password?</a>
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--muted)' }}>
          New here? <Link to="/register" style={{ color: 'var(--accent)' }}>Create account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
