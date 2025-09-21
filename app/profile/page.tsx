'use client';

import { AppShell } from '../../components/AppShell';
import { useState } from 'react';
import { User, Settings, CreditCard, Trophy, LogOut, Wallet } from 'lucide-react';

export default function ProfilePage() {
  const [user] = useState({
    userId: 'user1',
    username: 'DanceMaster2024',
    farcasterId: '@dancemaster',
    creditsBalance: 15,
    joinDate: new Date('2024-01-01'),
    routinesCreated: 12,
    hoursPracticed: 45,
    movesMastered: 8
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="card-cosmic">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <p className="text-white/70">{user.farcasterId}</p>
              <p className="text-white/60 text-sm">
                Member since {user.joinDate.toLocaleDateString()}
              </p>
            </div>
            <button className="btn-secondary">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card-cosmic text-center">
            <div className="text-2xl font-bold text-cosmic-purple mb-1">
              {user.routinesCreated}
            </div>
            <div className="text-white/70 text-sm">Routines Created</div>
          </div>
          <div className="card-cosmic text-center">
            <div className="text-2xl font-bold text-cosmic-pink mb-1">
              {user.hoursPracticed}h
            </div>
            <div className="text-white/70 text-sm">Hours Practiced</div>
          </div>
          <div className="card-cosmic text-center">
            <div className="text-2xl font-bold text-cosmic-cyan mb-1">
              {user.movesMastered}
            </div>
            <div className="text-white/70 text-sm">Moves Mastered</div>
          </div>
        </div>

        {/* Credits & Wallet */}
        <div className="card-cosmic">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Credits & Wallet
            </h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-cosmic-purple">{user.creditsBalance}</div>
              <div className="text-white/60 text-sm">Available Credits</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-primary flex items-center justify-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Buy Credits</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="card-cosmic">
          <h2 className="text-xl font-semibold text-white flex items-center mb-4">
            <Trophy className="w-5 h-5 mr-2" />
            Achievements
          </h2>
          <div className="space-y-3">
            {[
              { name: 'First Routine', description: 'Created your first dance routine', unlocked: true },
              { name: 'Practice Master', description: 'Practiced for 10+ hours', unlocked: true },
              { name: 'Move Collector', description: 'Learned 10 different moves', unlocked: false },
              { name: 'Choreography Creator', description: 'Generated 5 AI choreographies', unlocked: false },
              { name: 'Social Dancer', description: 'Shared 3 routines publicly', unlocked: false }
            ].map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-white/10' : 'bg-white/5 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-pink'
                    : 'bg-white/20'
                }`}>
                  <Trophy className={`w-5 h-5 ${achievement.unlocked ? 'text-white' : 'text-white/40'}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-white/60'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${achievement.unlocked ? 'text-white/70' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="text-cosmic-purple font-bold">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="card-cosmic">
          <h2 className="text-xl font-semibold text-white flex items-center mb-4">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Practice Reminders</h3>
                <p className="text-white/60 text-sm">Get notified to practice daily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cosmic-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-save Routines</h3>
                <p className="text-white/60 text-sm">Automatically save routine progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cosmic-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Public Profile</h3>
                <p className="text-white/60 text-sm">Allow others to view your routines</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cosmic-purple"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="card-cosmic">
          <button className="w-full btn-secondary flex items-center justify-center space-x-2 text-red-400 hover:text-red-300">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}

