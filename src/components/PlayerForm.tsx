import { useState } from 'react';
import './PlayerForm.css';

interface PlayerFormProps {
  onSubmit: (name: string) => void;
}

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="player-form-container">
      <h1 className="form-title">🎄 Virtual Pamasko 2024 🎄</h1>
      <form onSubmit={handleSubmit} className="player-form">
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input color-red"
            required
            maxLength={50}
          />
          <span className="input-focus-border"></span>
        </div>
        <button type="submit" className="submit-button" disabled={!name.trim()}>
          🎁 Claim Your Gift! 🎁
        </button>
      </form>
    </div>
  );
};