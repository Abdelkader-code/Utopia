import { Language } from '../types';

type TranslationKey = 
  | 'welcome' 
  | 'selectLanguage' 
  | 'login' 
  | 'signup' 
  | 'email' 
  | 'password' 
  | 'confirmPassword'
  | 'forgotPassword'
  | 'noAccount'
  | 'hasAccount'
  | 'username'
  | 'displayName'
  | 'bio'
  | 'joinNow'
  | 'feed'
  | 'profile'
  | 'messages'
  | 'notifications'
  | 'settings'
  | 'logout'
  | 'createPost'
  | 'comment'
  | 'like'
  | 'share'
  | 'following'
  | 'followers'
  | 'editProfile'
  | 'saveChanges'
  | 'cancel'
  | 'darkMode'
  | 'lightMode';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    welcome: 'Welcome to Utopia',
    selectLanguage: 'Select your language',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    username: 'Username',
    displayName: 'Display Name',
    bio: 'Bio',
    joinNow: 'Join Now',
    feed: 'Feed',
    profile: 'Profile',
    messages: 'Messages',
    notifications: 'Notifications',
    settings: 'Settings',
    logout: 'Logout',
    createPost: 'Create Post',
    comment: 'Comment',
    like: 'Like',
    share: 'Share',
    following: 'Following',
    followers: 'Followers',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },
  fr: {
    welcome: 'Bienvenue sur Utopia',
    selectLanguage: 'Sélectionnez votre langue',
    login: 'Connexion',
    signup: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    noAccount: 'Vous n\'avez pas de compte?',
    hasAccount: 'Vous avez déjà un compte?',
    username: 'Nom d\'utilisateur',
    displayName: 'Nom d\'affichage',
    bio: 'Bio',
    joinNow: 'Rejoindre maintenant',
    feed: 'Fil d\'actualité',
    profile: 'Profil',
    messages: 'Messages',
    notifications: 'Notifications',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    createPost: 'Créer un post',
    comment: 'Commenter',
    like: 'J\'aime',
    share: 'Partager',
    following: 'Abonnements',
    followers: 'Abonnés',
    editProfile: 'Modifier le profil',
    saveChanges: 'Enregistrer les modifications',
    cancel: 'Annuler',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair'
  },
  ja: {
    welcome: 'Utopiaへようこそ',
    selectLanguage: '言語を選択してください',
    login: 'ログイン',
    signup: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    confirmPassword: 'パスワード確認',
    forgotPassword: 'パスワードをお忘れですか？',
    noAccount: 'アカウントをお持ちでないですか？',
    hasAccount: 'すでにアカウントをお持ちですか？',
    username: 'ユーザー名',
    displayName: '表示名',
    bio: '自己紹介',
    joinNow: '今すぐ参加',
    feed: 'フィード',
    profile: 'プロフィール',
    messages: 'メッセージ',
    notifications: '通知',
    settings: '設定',
    logout: 'ログアウト',
    createPost: '投稿を作成',
    comment: 'コメント',
    like: 'いいね',
    share: 'シェア',
    following: 'フォロー中',
    followers: 'フォロワー',
    editProfile: 'プロフィールを編集',
    saveChanges: '変更を保存',
    cancel: 'キャンセル',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード'
  },
  es: {
    welcome: 'Bienvenido a Utopia',
    selectLanguage: 'Selecciona tu idioma',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes una cuenta?',
    hasAccount: '¿Ya tienes una cuenta?',
    username: 'Nombre de usuario',
    displayName: 'Nombre a mostrar',
    bio: 'Biografía',
    joinNow: 'Únete ahora',
    feed: 'Feed',
    profile: 'Perfil',
    messages: 'Mensajes',
    notifications: 'Notificaciones',
    settings: 'Configuración',
    logout: 'Cerrar sesión',
    createPost: 'Crear publicación',
    comment: 'Comentar',
    like: 'Me gusta',
    share: 'Compartir',
    following: 'Siguiendo',
    followers: 'Seguidores',
    editProfile: 'Editar perfil',
    saveChanges: 'Guardar cambios',
    cancel: 'Cancelar',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro'
  },
  it: {
    welcome: 'Benvenuto su Utopia',
    selectLanguage: 'Seleziona la tua lingua',
    login: 'Accedi',
    signup: 'Registrati',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Conferma password',
    forgotPassword: 'Password dimenticata?',
    noAccount: 'Non hai un account?',
    hasAccount: 'Hai già un account?',
    username: 'Nome utente',
    displayName: 'Nome visualizzato',
    bio: 'Biografia',
    joinNow: 'Unisciti ora',
    feed: 'Feed',
    profile: 'Profilo',
    messages: 'Messaggi',
    notifications: 'Notifiche',
    settings: 'Impostazioni',
    logout: 'Esci',
    createPost: 'Crea post',
    comment: 'Commenta',
    like: 'Mi piace',
    share: 'Condividi',
    following: 'Seguiti',
    followers: 'Follower',
    editProfile: 'Modifica profilo',
    saveChanges: 'Salva modifiche',
    cancel: 'Annulla',
    darkMode: 'Modalità scura',
    lightMode: 'Modalità chiara'
  },
  de: {
    welcome: 'Willkommen bei Utopia',
    selectLanguage: 'Wähle deine Sprache',
    login: 'Anmelden',
    signup: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    forgotPassword: 'Passwort vergessen?',
    noAccount: 'Noch kein Konto?',
    hasAccount: 'Bereits ein Konto?',
    username: 'Benutzername',
    displayName: 'Anzeigename',
    bio: 'Biografie',
    joinNow: 'Jetzt beitreten',
    feed: 'Feed',
    profile: 'Profil',
    messages: 'Nachrichten',
    notifications: 'Benachrichtigungen',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    createPost: 'Beitrag erstellen',
    comment: 'Kommentieren',
    like: 'Gefällt mir',
    share: 'Teilen',
    following: 'Folge ich',
    followers: 'Follower',
    editProfile: 'Profil bearbeiten',
    saveChanges: 'Änderungen speichern',
    cancel: 'Abbrechen',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus'
  }
};