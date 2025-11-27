import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnonymizedMemberTable = ({ members, onExport }) => {
  const [sortField, setSortField] = useState('engagementScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedMembers = [...members]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const paginatedMembers = sortedMembers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(members?.length / itemsPerPage);

  const getEngagementBadge = (score) => {
    if (score >= 80) return { label: 'High', color: 'bg-success text-white' };
    if (score >= 60) return { label: 'Medium', color: 'bg-warning text-white' };
    return { label: 'Low', color: 'bg-muted text-muted-foreground' };
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        <Icon 
          name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={16} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-2xl border border-border shadow-gentle overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Member Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Anonymized engagement data for {members?.length} team members
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="memberId">Member ID</SortableHeader>
              <SortableHeader field="department">Department</SortableHeader>
              <SortableHeader field="engagementScore">Engagement</SortableHeader>
              <SortableHeader field="streakDays">Streak</SortableHeader>
              <SortableHeader field="completedSessions">Sessions</SortableHeader>
              <SortableHeader field="favoriteCategory">Preference</SortableHeader>
              <SortableHeader field="lastActive">Last Active</SortableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers?.map((member) => {
              const engagementBadge = getEngagementBadge(member?.engagementScore);
              return (
                <tr key={member?.memberId} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {member?.memberId?.slice(-2)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{member?.memberId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{member?.department}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{member?.engagementScore}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${engagementBadge?.color}`}>
                        {engagementBadge?.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Flame" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">{member?.streakDays} days</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{member?.completedSessions}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                      {member?.favoriteCategory}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{member?.lastActive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {paginatedMembers?.map((member) => {
          const engagementBadge = getEngagementBadge(member?.engagementScore);
          return (
            <div key={member?.memberId} className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {member?.memberId?.slice(-2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{member?.memberId}</p>
                    <p className="text-sm text-muted-foreground">{member?.department}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${engagementBadge?.color}`}>
                  {engagementBadge?.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Engagement</p>
                  <p className="font-medium text-foreground">{member?.engagementScore}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Streak</p>
                  <p className="font-medium text-foreground">{member?.streakDays} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sessions</p>
                  <p className="font-medium text-foreground">{member?.completedSessions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preference</p>
                  <p className="font-medium text-foreground">{member?.favoriteCategory}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, members?.length)} of {members?.length} members
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
            >
              Previous
            </Button>
            <span className="text-sm text-foreground px-3">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnonymizedMemberTable;