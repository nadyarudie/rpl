// src/components/UserMenu.jsx
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserMenu({ onLogout }) {
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-3 py-2 rounded-full bg-gray-200">👤</Menu.Button>
      <Transition as={Fragment} /* ...transitions */>
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active ? 'bg-gray-100' : ''} block w-full text-left px-4 py-2`}
                onClick={() => navigate('/profile')}
              >
                Profil
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active ? 'bg-gray-100' : ''} block w-full text-left px-4 py-2`}
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
