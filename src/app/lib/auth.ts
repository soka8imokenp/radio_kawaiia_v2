// Заглушка базы данных (потом заменишь на реальную БД)
type User = {
  id: string;
  email?: string;
  telegramId?: string;
  nickname: string;
  passwordHash?: string;
  avatar?: string;
  createdAt: string;
};

// Имитация базы в localStorage (только для демо)
const USERS_KEY = 'kawaiiuz_users';

function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Простой хеш (не для прода, замени на bcrypt на бекенде)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Проверить существование пользователя
export function findUser(identifier: { email?: string; telegramId?: string }): User | null {
  const users = getUsers();
  if (identifier.email) {
    return users.find(u => u.email === identifier.email) || null;
  }
  if (identifier.telegramId) {
    return users.find(u => u.telegramId === identifier.telegramId) || null;
  }
  return null;
}

// Создать нового пользователя
export function createUser(data: {
  email?: string;
  telegramId?: string;
  nickname: string;
  password: string;
}): User {
  const users = getUsers();
  
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    email: data.email,
    telegramId: data.telegramId,
    nickname: data.nickname,
    passwordHash: simpleHash(data.password),
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// Проверить пароль
export function verifyPassword(user: User, password: string): boolean {
  return user.passwordHash === simpleHash(password);
}

// Сохранить сессию
export function saveSession(user: User) {
  if (typeof window === 'undefined') return;
  const session = { userId: user.id, nickname: user.nickname, email: user.email, telegramId: user.telegramId };
  localStorage.setItem('kawaiiuz_session', JSON.stringify(session));
}

// Получить сессию
export function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('kawaiiuz_session');
  if (!session) return null;
  const data = JSON.parse(session);
  return findUser({ email: data.email, telegramId: data.telegramId });
}

// Выйти
export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('kawaiiuz_session');
}