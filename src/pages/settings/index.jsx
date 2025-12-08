import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    try { return localStorage.getItem('carevis-reduced-motion') === 'true'; } catch(e){return false}
  });
  const [largeText, setLargeText] = useState(() => {
    try { return localStorage.getItem('carevis-large-text') === 'true'; } catch(e){return false}
  });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('carevis-theme') || 'light'; } catch(e){return 'light'}
  });

  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    try { localStorage.setItem('carevis-reduced-motion', reducedMotion); } catch(e){}
  }, [reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    try { localStorage.setItem('carevis-large-text', largeText); } catch(e){}
  }, [largeText]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.remove('high-contrast');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'high-contrast') root.classList.add('high-contrast');
    try { localStorage.setItem('carevis-theme', theme); } catch(e){}
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="user" />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} userRole="user" />

      <main className={`transition-all duration-300 lg:pl-${sidebarCollapsed ? '20' : '72'} pb-20 lg:pb-8`}>
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Configure your app preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Display & Accessibility</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reduce Motion</div>
                      <div className="text-xs text-muted-foreground">Disables non-essential animations and transitions</div>
                    </div>
                    <Button variant={reducedMotion ? 'default' : 'ghost'} onClick={() => setReducedMotion(v => !v)}>
                      <Icon name={reducedMotion ? 'ToggleRight' : 'ToggleLeft'} size={18} />
                      <span className="mx-2">{reducedMotion ? 'On' : 'Off'}</span>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Large Text</div>
                      <div className="text-xs text-muted-foreground">Increase base font size for readability</div>
                    </div>
                    <Button variant={largeText ? 'default' : 'ghost'} onClick={() => setLargeText(v => !v)}>
                      <Icon name={largeText ? 'ToggleRight' : 'ToggleLeft'} size={18} />
                      <span className="mx-2">{largeText ? 'On' : 'Off'}</span>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Theme</div>
                      <div className="text-xs text-muted-foreground">Switch between Light, Dark and High Contrast</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant={theme === 'light' ? 'default' : 'ghost'} onClick={() => setTheme('light')}>Light</Button>
                      <Button variant={theme === 'dark' ? 'default' : 'ghost'} onClick={() => setTheme('dark')}>Dark</Button>
                      <Button variant={theme === 'high-contrast' ? 'default' : 'ghost'} onClick={() => setTheme('high-contrast')}>High Contrast</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border mt-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Privacy & Data</h2>
                <p className="text-sm text-muted-foreground">Control how your data is stored and used. (Demo controls only.)</p>
                <div className="mt-4 space-y-3">
                  <Button variant="ghost" onClick={() => { localStorage.removeItem('carevis-theme'); localStorage.removeItem('carevis-reduced-motion'); localStorage.removeItem('carevis-large-text'); window.location.reload(); }}>
                    Reset to defaults
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border sticky top-24">
                <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost">Export Settings</Button>
                  <Button variant="ghost">Import Settings</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
