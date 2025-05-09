import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';

type Props = { users: UserType[] }

function UsersList({ users }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card
          key={user.id}
          className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card-secondary-foreground border border-gray-200 will-change-transform select-none"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-800"></div>
          <CardHeader className="flex flex-row items-center gap-4 pt-6">
            <Avatar className="h-16 w-16 ring-2 ring-indigo-200">
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
              />
              <AvatarFallback className='uppercase'>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">
                {user.name}
              </CardTitle>
              <CardDescription className="text-gray-500">@{user.username}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-5 w-5 text-blue-400 shrink-0 truncate" />
              <a
                href={`mailto:${user.email}`}
                className="hover:text-blue-400 transition-colors truncate"
              >
                {user.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-5 w-5 text-blue-400 shrink-0" />
              <a href={`tel:${user.phone}`} className="hover:text-blue-400 transition-colors">{user.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
              <span>
                {user.address.street}, {user.address.city}
              </span>
            </div>
            <div>
              <Badge
                variant="secondary"
                className="bg-gray-200 px-4 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
              >
                {user.company.name}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default UsersList