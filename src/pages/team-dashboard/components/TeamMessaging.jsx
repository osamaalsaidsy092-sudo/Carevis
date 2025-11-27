import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamMessaging = ({ onSendMessage, recentMessages = [] }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('announcement');
  const [selectedRecipients, setSelectedRecipients] = useState('all');

  const messageTypes = [
    { value: 'announcement', label: 'Announcement', icon: 'Megaphone', color: 'text-primary' },
    { value: 'motivation', label: 'Motivation', icon: 'Heart', color: 'text-success' },
    { value: 'reminder', label: 'Reminder', icon: 'Bell', color: 'text-warning' },
    { value: 'tip', label: 'Wellness Tip', icon: 'Lightbulb', color: 'text-accent' }
  ];

  const recipientOptions = [
    { value: 'all', label: 'All Team Members' },
    { value: 'active', label: 'Active Members Only' },
    { value: 'inactive', label: 'Inactive Members' },
    { value: 'department', label: 'By Department' }
  ];

  const handleSend = () => {
    if (!message?.trim()) return;

    const messageData = {
      content: message,
      type: messageType,
      recipients: selectedRecipients,
      timestamp: new Date()?.toISOString(),
      sender: 'Team Leader'
    };

    onSendMessage?.(messageData);
    setMessage('');
  };

  const getMessageTypeInfo = (type) => {
    return messageTypes?.find(mt => mt?.value === type) || messageTypes?.[0];
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-gentle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Messaging</h3>
            <p className="text-sm text-muted-foreground">Send wellness updates to your team</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Message Type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Message Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {messageTypes?.map(type => (
              <button
                key={type?.value}
                onClick={() => setMessageType(type?.value)}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  messageType === type?.value
                    ? 'border-primary bg-primary/10' :'border-border bg-background hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={type?.icon} size={16} className={messageType === type?.value ? 'text-primary' : type?.color} />
                  <span className="text-sm font-medium">{type?.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipients */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Send To
          </label>
          <select
            value={selectedRecipients}
            onChange={(e) => setSelectedRecipients(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {recipientOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Content */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            placeholder={`Write your ${getMessageTypeInfo(messageType)?.label?.toLowerCase()} here...`}
            rows={4}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {message?.length}/300 characters
            </p>
            <Button
              onClick={handleSend}
              disabled={!message?.trim() || message?.length > 300}
              size="sm"
              iconName="Send"
              iconPosition="right"
            >
              Send Message
            </Button>
          </div>
        </div>

        {/* Recent Messages */}
        {recentMessages?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Recent Messages</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentMessages?.slice(0, 3)?.map((msg, index) => {
                const typeInfo = getMessageTypeInfo(msg?.type);
                return (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={typeInfo?.icon} size={14} className={typeInfo?.color} />
                      <span className="text-xs font-medium text-foreground">{typeInfo?.label}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg?.timestamp)?.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{msg?.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMessaging;