import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LanguageSelector from '../../components/LanguageSelector';
import { Mail, Lock, User, UserPlus, Calendar } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { Language } from '../../types';

const Signup: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(currentLanguage);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !firstName || !lastName || !birthDate) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Vérification de l'âge (18 ans minimum)
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    if (age < 18) {
      setError('Vous devez avoir au moins 18 ans pour vous inscrire');
      return;
    }

    try {
      await signup(email, password, `${firstName} ${lastName}`, birthDate, preferredLanguage);
      navigate('/feed');
    } catch (err) {
      setError('Une erreur est survenue lors de la création du compte');
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setPreferredLanguage(language);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('signup')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('hasAccount')}{' '}
            <Link
              to="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {t('login')}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
            {error && (
              <div className="mb-4 p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                icon={<Mail size={18} />}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="firstName"
                  label="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  required
                  icon={<User size={18} />}
                />

                <Input
                  id="lastName"
                  label="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dupont"
                  required
                  icon={<User size={18} />}
                />
              </div>

              <Input
                id="birthDate"
                label="Date de naissance"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                icon={<Calendar size={18} />}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="password"
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  icon={<Lock size={18} />}
                />

                <Input
                  id="confirmPassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  icon={<Lock size={18} />}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('selectLanguage')}
                </label>
                <LanguageSelector 
                  onSelect={handleLanguageSelect} 
                  size="sm" 
                  className="mt-1"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  icon={<UserPlus size={18} />}
                >
                  {t('joinNow')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;