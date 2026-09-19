import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('Ava Sharma');
  const [email, setEmail] = useState('ava@coteps.com');
  const [password, setPassword] = useState('password123');
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    register({ fullName, email, password });
    navigate('/explorer');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, rgba(46,204,113,0.16), transparent 35%), linear-gradient(135deg, #05070b 0%, #11151d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ width: 'min(460px, 100%)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '0.16em', marginBottom: '0.25rem' }}>COTEPS</div>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Create your account and start your foodie journey.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
          <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          <Button type="submit">Create account</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
