import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Search,
  Settings,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  BellOff,
  Trash2,
  Filter,
  X,
  Upload,
  Library,
  Info
} from "lucide-react";

interface Message {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
  date: string;
}

interface Conversation {
  id: string;
  name: string;
  type: "user" | "group";
  userRole?: "tutor" | "tutee";
  isOnline?: boolean;
  lastMessage: string;
  lastContactDate: string;
  avatar: string;
  initials: string;
  isMarked: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    type: "user",
    userRole: "tutor",
    isOnline: true,
    lastMessage: "See you in class tomorrow!",
    lastContactDate: "2 hours ago",
    avatar: "",
    initials: "SJ",
    isMarked: true,
    messages: [
      { id: "1", sender: "other", text: "Hi! Do you have any questions about the assignment?", time: "10:30 AM", date: "Today" },
      { id: "2", sender: "me", text: "Yes, I'm a bit confused about problem 3.", time: "10:32 AM", date: "Today" },
      { id: "3", sender: "other", text: "No problem! Let me explain it to you.", time: "10:35 AM", date: "Today" },
      { id: "4", sender: "other", text: "See you in class tomorrow!", time: "10:45 AM", date: "Today" }
    ]
  },
  {
    id: "2",
    name: "Physics Study Group",
    type: "group",
    lastMessage: "John: I uploaded the notes",
    lastContactDate: "1 day ago",
    avatar: "",
    initials: "PSG",
    isMarked: false,
    messages: [
      { id: "1", sender: "other", text: "Hey everyone! Study session this Friday?", time: "3:00 PM", date: "Yesterday" },
      { id: "2", sender: "me", text: "I'm in! What time?", time: "3:15 PM", date: "Yesterday" },
      { id: "3", sender: "other", text: "I uploaded the notes", time: "4:30 PM", date: "Yesterday" }
    ]
  },
  {
    id: "3",
    name: "Prof. Michael Chen",
    type: "user",
    userRole: "tutor",
    isOnline: false,
    lastMessage: "Your paper looks great!",
    lastContactDate: "3 days ago",
    avatar: "",
    initials: "MC",
    isMarked: false,
    messages: [
      { id: "1", sender: "me", text: "Professor, I sent you my draft paper.", time: "9:00 AM", date: "3 days ago" },
      { id: "2", sender: "other", text: "I'll review it today.", time: "10:30 AM", date: "3 days ago" },
      { id: "3", sender: "other", text: "Your paper looks great!", time: "2:00 PM", date: "3 days ago" }
    ]
  },
  {
    id: "4",
    name: "Emily Davis",
    type: "user",
    userRole: "tutee",
    isOnline: true,
    lastMessage: "Thanks for your help!",
    lastContactDate: "1 week ago",
    avatar: "",
    initials: "ED",
    isMarked: false,
    messages: [
      { id: "1", sender: "other", text: "Can you help me with coding assignment?", time: "5:00 PM", date: "1 week ago" },
      { id: "2", sender: "me", text: "Sure! What part are you stuck on?", time: "5:10 PM", date: "1 week ago" },
      { id: "3", sender: "other", text: "Thanks for your help!", time: "6:00 PM", date: "1 week ago" }
    ]
  }
];

export function Messaging() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [conversationFilter, setConversationFilter] = useState("all");
  const [privacyPolicy, setPrivacyPolicy] = useState("same-courses");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [userInfoDialog, setUserInfoDialog] = useState<{ open: boolean; user: any | null }>({ 
    open: false, 
    user: null 
  });

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (conversationFilter === "marked") {
      matchesFilter = conv.isMarked;
    } else if (conversationFilter === "tutor") {
      matchesFilter = conv.type === "user" && conv.userRole === "tutor";
    } else if (conversationFilter === "tutee") {
      matchesFilter = conv.type === "user" && conv.userRole === "tutee";
    } else if (conversationFilter === "group") {
      matchesFilter = conv.type === "group";
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: "Today"
    };

    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id
        ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: messageInput, lastContactDate: "Just now" }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });
    setMessageInput("");
  };

  const handleMarkConversation = (convId: string) => {
    const updatedConversations = conversations.map(conv =>
      conv.id === convId ? { ...conv, isMarked: !conv.isMarked } : conv
    );
    setConversations(updatedConversations);
    if (selectedConversation?.id === convId) {
      setSelectedConversation({ ...selectedConversation, isMarked: !selectedConversation.isMarked });
    }
  };

  const handleDeleteConversation = (convId: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== convId);
    setConversations(updatedConversations);
    if (selectedConversation?.id === convId) {
      setSelectedConversation(updatedConversations[0] || null);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedConversation) return;
    
    const updatedMessages = selectedConversation.messages.filter(msg => msg.id !== messageId);
    const updatedConversation = { ...selectedConversation, messages: updatedMessages };
    
    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    ));
    setSelectedConversation(updatedConversation);
  };

  const handleViewUserInfo = (conv: Conversation) => {
    if (conv.type === "user") {
      setUserInfoDialog({
        open: true,
        user: {
          name: conv.name,
          email: `${conv.name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
          role: conv.name.includes("Dr.") || conv.name.includes("Prof.") ? "Tutor" : "Tutee",
          courses: {
            attended: ["Introduction to Physics", "Advanced Mathematics"],
            attending: ["Quantum Mechanics", "Linear Algebra"]
          }
        }
      });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1>Messages</h1>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Privacy Settings</DialogTitle>
              <DialogDescription>
                You can restrict who can message you.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <RadioGroup value={privacyPolicy} onValueChange={setPrivacyPolicy}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="same-courses" id="same-courses" />
                  <Label htmlFor="same-courses">Only those who are in the same courses with me</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all-users" id="all-users" />
                  <Label htmlFor="all-users">All those who use this platform</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsSettingsOpen(false)}>Save Settings</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Dropdown */}
              <div className="mb-4">
                <Select value={conversationFilter} onValueChange={setConversationFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter conversations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conversations</SelectItem>
                    <SelectItem value="marked">Marked</SelectItem>
                    <SelectItem value="tutor">Tutors</SelectItem>
                    <SelectItem value="tutee">Tutees</SelectItem>
                    <SelectItem value="group">Groups</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conversations */}
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        selectedConversation?.id === conv.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={conv.avatar} />
                          <AvatarFallback>{conv.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="truncate">{conv.name}</p>
                            {conv.isMarked && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">{conv.lastContactDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <Card className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.type === "user" && (
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        selectedConversation.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`} />
                    )}
                  </div>
                  <div>
                    <p>{selectedConversation.name}</p>
                    {selectedConversation.type === "user" && (
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.isOnline ? "Online" : "Offline"}
                      </p>
                    )}
                    {selectedConversation.type === "group" && (
                      <Badge variant="secondary" className="text-xs">Group</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConversation.type === "user" && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleViewUserInfo(selectedConversation)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleMarkConversation(selectedConversation.id)}>
                      <Star className="h-4 w-4 mr-2" />
                      {selectedConversation.isMarked ? "Unmark" : "Mark"} Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BellOff className="h-4 w-4 mr-2" />
                      Turn Off Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteConversation(selectedConversation.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="group relative max-w-[70%]">
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "me"
                              ? "bg-blue-600 text-white"
                              : "bg-accent"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-blue-100" : "text-muted-foreground"
                          }`}>
                            {message.time}
                          </p>
                        </div>
                        {message.sender === "me" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow-md"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Dialog open={isAttachmentOpen} onOpenChange={setIsAttachmentOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Attach Document</DialogTitle>
                        <DialogDescription>
                          Upload a document from your computer or connect to university library.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Button variant="outline" className="h-24">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6" />
                            <span>Upload from Computer</span>
                          </div>
                        </Button>
                        <Button variant="outline" className="h-24">
                          <div className="flex flex-col items-center gap-2">
                            <Library className="h-6 w-6" />
                            <span>Connect to University Library</span>
                          </div>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </Card>
          )}
        </div>
      </div>

      {/* User Info Dialog */}
      <Dialog open={userInfoDialog.open} onOpenChange={(open) => setUserInfoDialog({ ...userInfoDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Information</DialogTitle>
            <DialogDescription>
              View detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          {userInfoDialog.user && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p>{userInfoDialog.user.name}</p>
              </div>
              <Separator />
              <div>
                <Label>Contact Email</Label>
                <p className="text-sm text-muted-foreground">{userInfoDialog.user.email}</p>
              </div>
              <Separator />
              <div>
                <Label>Role</Label>
                <Badge variant="outline">{userInfoDialog.user.role}</Badge>
              </div>
              <Separator />
              <div>
                <Label>Attended Courses</Label>
                <div className="mt-2 space-y-1">
                  {userInfoDialog.user.courses.attended.map((course: string, idx: number) => (
                    <p key={idx} className="text-sm text-muted-foreground">• {course}</p>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <Label>Currently Attending</Label>
                <div className="mt-2 space-y-1">
                  {userInfoDialog.user.courses.attending.map((course: string, idx: number) => (
                    <p key={idx} className="text-sm text-muted-foreground">• {course}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
