import React, { useState } from 'react';
import { 
  Users, Search, Plus, Edit, Trash2, Shield, UserCheck, UserX, 
  Clock, Mail, Phone, Building 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: '김관리자',
      email: 'admin@company.com',
      phone: '010-1234-5678',
      role: 'admin',
      department: 'IT관리팀',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2023-12-01',
      permissions: ['all']
    },
    {
      id: 2,
      name: '박편집자',
      email: 'editor@company.com',
      phone: '010-2345-6789',
      role: 'editor',
      department: '마케팅팀',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      createdAt: '2024-01-05',
      permissions: ['content_manage', 'schedule_manage']
    },
    {
      id: 3,
      name: '이조회자',
      email: 'viewer@company.com',
      phone: '010-3456-7890',
      role: 'viewer',
      department: '운영팀',
      status: 'active',
      lastLogin: '2024-01-15 09:45',
      createdAt: '2024-01-10',
      permissions: ['view_only']
    },
    {
      id: 4,
      name: '최운영자',
      email: 'operator@company.com',
      phone: '010-4567-8901',
      role: 'operator',
      department: '시설관리팀',
      status: 'inactive',
      lastLogin: '2024-01-10 16:20',
      createdAt: '2023-11-15',
      permissions: ['device_manage', 'schedule_manage']
    },
    {
      id: 5,
      name: '정분석가',
      email: 'analyst@company.com',
      phone: '010-5678-9012',
      role: 'analyst',
      department: '데이터팀',
      status: 'pending',
      lastLogin: null,
      createdAt: '2024-01-14',
      permissions: ['view_only', 'reports']
    }
  ];

  const activityLogs = [
    {
      id: 1,
      user: '김관리자',
      action: '사용자 추가',
      target: '정분석가',
      timestamp: '2024-01-14 15:30',
      ip: '192.168.1.50'
    },
    {
      id: 2,
      user: '박편집자',
      action: '콘텐츠 업로드',
      target: '2024 신제품 프로모션',
      timestamp: '2024-01-14 14:20',
      ip: '192.168.1.51'
    },
    {
      id: 3,
      user: '이조회자',
      action: '로그인',
      target: '시스템',
      timestamp: '2024-01-14 09:45',
      ip: '192.168.1.52'
    },
    {
      id: 4,
      user: '김관리자',
      action: '기기 재부팅',
      target: '로비 디스플레이 #1',
      timestamp: '2024-01-13 16:15',
      ip: '192.168.1.50'
    },
    {
      id: 5,
      user: '최운영자',
      action: '스케줄 수정',
      target: '긴급 공지사항',
      timestamp: '2024-01-13 11:30',
      ip: '192.168.1.53'
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: '관리자', color: 'bg-red-100 text-red-800' },
      editor: { label: '편집자', color: 'bg-blue-100 text-blue-800' },
      operator: { label: '운영자', color: 'bg-green-100 text-green-800' },
      viewer: { label: '조회자', color: 'bg-gray-100 text-gray-800' },
      analyst: { label: '분석가', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = roleConfig[role] || { label: '알 수 없음', color: 'bg-gray-100 text-gray-800' };
    return <Badge variant="default" className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">활성</Badge>;
      case 'inactive':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">비활성</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">대기중</Badge>;
      case 'suspended':
        return <Badge variant="destructive">정지</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getPermissionText = (permissions: string[]) => {
    const permissionMap = {
      all: '전체 권한',
      content_manage: '콘텐츠 관리',
      schedule_manage: '스케줄 관리',
      device_manage: '기기 관리',
      user_manage: '사용자 관리',
      view_only: '조회만',
      reports: '리포트'
    };
    
    return permissions.map(p => permissionMap[p] || p).join(', ');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">사용자 관리</h2>
          <p className="text-gray-600">시스템 사용자와 권한을 관리하세요</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              사용자 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 사용자 추가</DialogTitle>
              <DialogDescription>
                새로운 사용자를 시스템에 등록하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name">이름</Label>
                <Input id="user-name" placeholder="사용자 이름을 입력하세요" />
              </div>
              
              <div>
                <Label htmlFor="user-email">이메일</Label>
                <Input id="user-email" type="email" placeholder="user@company.com" />
              </div>

              <div>
                <Label htmlFor="user-phone">전화번호</Label>
                <Input id="user-phone" placeholder="010-0000-0000" />
              </div>

              <div>
                <Label htmlFor="user-department">부서</Label>
                <Input id="user-department" placeholder="부서명을 입력하세요" />
              </div>

              <div>
                <Label htmlFor="user-role">역할</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="역할을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">관리자</SelectItem>
                    <SelectItem value="editor">편집자</SelectItem>
                    <SelectItem value="operator">운영자</SelectItem>
                    <SelectItem value="viewer">조회자</SelectItem>
                    <SelectItem value="analyst">분석가</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setIsAddUserOpen(false)}>
                  추가
                </Button>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">사용자 목록</TabsTrigger>
          <TabsTrigger value="activity">활동 로그</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="이름, 이메일, 부서로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.department}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(user.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">역할</span>
                    {getRoleBadge(user.role)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.department}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-1">권한</p>
                    <p className="text-sm">{getPermissionText(user.permissions)}</p>
                  </div>

                  {user.lastLogin && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>마지막 로그인: {user.lastLogin}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      편집
                    </Button>
                    <Button variant="outline" size="sm">
                      {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">검색 조건에 맞는 사용자가 없습니다.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>사용자 활동 로그</CardTitle>
              <CardDescription>시스템 내 사용자 활동 기록</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>사용자</TableHead>
                    <TableHead>활동</TableHead>
                    <TableHead>대상</TableHead>
                    <TableHead>시간</TableHead>
                    <TableHead>IP 주소</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{log.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{log.target}</TableCell>
                      <TableCell className="text-gray-600">{log.timestamp}</TableCell>
                      <TableCell className="text-gray-600">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}