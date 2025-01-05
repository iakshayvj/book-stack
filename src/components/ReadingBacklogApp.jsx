import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, Download, Upload, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReadingBacklogApp = () => {
  // State management 
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('readingBacklog');
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');

  // Form state for adding/editing a book 
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    type: 'book',
    genre: '',
    source: '',
    purpose: '',
    priority: '',
    completionDate: null,
    comments: [],
    createdAt: null,
    updatedAt: null
  });

  // Constants for select options
  const PURPOSES = [
    { value: 'better-designer', label: 'Grow as a Designer' },
    { value: 'better-human', label: 'Personal Growth' },
    { value: 'better-thinker', label: 'Critical Thinking' },
    { value: 'better-writer', label: 'Writing Skills' },
    { value: 'better-programmer', label: 'Programming Expertise' },
    { value: 'better-raconteur', label: 'Casual Reading' },
    { value: 'better-philosopher', label: 'Philosophy' },
    { value: 'better-history', label: 'History' },
    { value: 'better-science', label: 'STEM' },
    { value: 'better-technologist', label: 'Tech Knowledge' }
  ];

  const PRIORITIES = [
    { value: 'currently-reading', label: 'Reading' },
    { value: 'next', label: 'Next Up' },
    { value: 'later', label: 'Later' },
    { value: 'read', label: 'Read' },
    { value: 'not-decided', label: 'Not Decided' }
  ];

  const MONTHS = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' }
  ];

  // Load data from localStorage on mount 
  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem('readingBacklog');
      console.log('Loading from localStorage:', savedBooks);
      if (savedBooks) {
        const parsedBooks = JSON.parse(savedBooks);
        console.log('Parsed books:', parsedBooks);
        setBooks(parsedBooks);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever books change
  useEffect(() => {
    try {
      localStorage.setItem('readingBacklog', JSON.stringify(books));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [books]);

  // Handle form submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const newBook = {
      ...formData,
      id: formData.id || crypto.randomUUID(),
      createdAt: formData.createdAt || timestamp,
      updatedAt: timestamp
    };

    if (formData.id) {
      setBooks(books.map(book => book.id === formData.id ? newBook : book));
    } else {
      setBooks([...books, newBook]);
    }

    setFormData({
      id: '',
      title: '',
      author: '',
      type: 'book',
      genre: '',
      source: '',
      purpose: '',
      priority: '',
      completionDate: null,
      comments: [],
      createdAt: null,
      updatedAt: null
    });
    setIsAddDialogOpen(false);
  };

  // Handle book deletion
  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
    setIsDetailSheetOpen(false);
  };

  // Helper function to get available years
  const getAvailableYears = (books) => {
    const years = books
      .filter(book => book.priority === 'read' && book.completionDate)
      .map(book => new Date(book.completionDate).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a); // Sort descending
  };

  // Handle adding a comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedBook = {
      ...selectedBook,
      comments: [...selectedBook.comments, {
        id: crypto.randomUUID(),
        text: newComment,
        timestamp: new Date().toISOString()
      }],
      updatedAt: new Date().toISOString()
    };

    setBooks(books.map(book =>
      book.id === selectedBook.id ? updatedBook : book
    ));
    setSelectedBook(updatedBook);
    setNewComment('');
  };

  // Export data
  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'reading-backlog.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import data
  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setBooks(importedData);
      } catch (error) {
        console.error('Error importing data:', error);
      }
    };

    reader.readAsText(file);
  };

  // Clear all data
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setBooks([]);
      localStorage.removeItem('readingBacklog');
    }
  };

  // Add this helper function at the component level (above return statement)
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'currently-reading':
        return 'bg-green-100 text-green-800'; // Pastel green
      case 'next':
        return 'bg-orange-100 text-orange-800'; // Pastel orange
      case 'later':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-purple-100 text-purple-800';   // Pastel blue
      case 'not-decided':
        return 'bg-gray-100 text-gray-800'; // Pastel gray
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] bg-subtle-pattern bg-fixed px-8 py-6" style={{ backgroundColor: '#F6F5F2' }}>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 flex items-center gap-3">
            <img src="/book.png" alt="Book Icon" className="w-8 h-8" />
            Reading Backlog</h1>


          <div className="flex gap-4">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
              Add Book
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => document.getElementById('import-input').click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <input
                id="import-input"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>

            <Button
              variant="destructive"
              onClick={handleClear}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Active Reading Section */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Currently Reading & Up Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books
                .filter(book => book.priority !== 'read')
                .sort((a, b) => {
                  const priorityOrder = {
                    'currently-reading': 1,
                    'next': 2,
                    'later': 3,
                    'not-decided': 4
                  };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map(book => (
                  <div
                    key={book.id}
                    onClick={() => {
                      setSelectedBook(book);
                      setIsDetailSheetOpen(true);
                    }}
                    className="bg-white rounded-lg shadow-md p-3 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start gap-4">

                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-lg mb-1 break-words">{book.title}</h3>
                        <p className="font-body text-gray-600 text-sm">by {book.author}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-1 text-sm rounded-full whitespace-nowrap ${getPriorityColor(book.priority)}`}>
                        {PRIORITIES.find(p => p.value === book.priority)?.label}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <hr />
          {/* Read Books Section */}

          {books.some(book => book.priority === 'read') && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-display text-xl font-semibold">Read Books</h2>
                <div className="flex gap-3">
                  <Select
                    value={filterYear}
                    onValueChange={setFilterYear}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {getAvailableYears(books).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {filterYear !== 'all' && (
                    <Select
                      value={filterMonth}
                      onValueChange={setFilterMonth}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        {MONTHS.map(month => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books
                  .filter(book => book.priority === 'read')
                  .filter(book => {
                    if (!book.completionDate) return false;
                    const completionDate = new Date(book.completionDate);

                    if (filterYear === 'all') return true;
                    if (completionDate.getFullYear().toString() !== filterYear) return false;

                    if (filterMonth === 'all') return true;
                    return completionDate.getMonth().toString() === filterMonth;
                  })
                  .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
                  .map(book => (
                    <div
                      key={book.id}
                      onClick={() => {
                        setSelectedBook(book);
                        setIsDetailSheetOpen(true);
                      }}
                      className="bg-white rounded-lg shadow-md p-3 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-body font-semibold text-lg mb-1 break-words">{book.title}</h3>
                          <p className="font-body text-gray-600 text-sm">by {book.author}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`shrink-0 px-2 py-1 text-sm rounded-full whitespace-nowrap ${getPriorityColor(book.priority)}`}>
                            {PRIORITIES.find(p => p.value === book.priority)?.label}
                          </span>
                          {book.completionDate && (
                            <span className="text-xs text-gray-500">
                              Completed: {new Date(book.completionDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {books.filter(book => book.priority === 'read').length > 0 &&
                books.filter(book => {
                  if (!book.completionDate) return false;
                  const completionDate = new Date(book.completionDate);

                  if (filterYear === 'all') return true;
                  if (completionDate.getFullYear().toString() !== filterYear) return false;

                  if (filterMonth === 'all') return true;
                  return completionDate.getMonth().toString() === filterMonth;
                }).length === 0 && (
                  <p className="text-center text-gray-500 mt-8">
                    No books found for the selected time period
                  </p>
                )}
            </div>
          )}

        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{formData.id ? 'Edit' : 'Add'} Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="magazine">Magazine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value, completionDate: value === 'read' ? new Date().toISOString().split('T')[0] : null })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                { /* Show completion date field only when priority is 'read' */}

                {formData.priority === 'read' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Completion Date</label>
                    <Input
                      type="date"
                      value={formData.completionDate || ''}
                      onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                      required
                    />
                  </div>
                )}


              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>



              {/* Hidden input for actual form submission */}
              <Input
                type="hidden"
                value={formData.title}
                name="title"
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <Input
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Purpose</label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map(purpose => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source & Reason</label>
                <Textarea
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="Where did you find this book and why did you add it to your backlog?"
                  className="h-24"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {formData.id ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Detail Sheet */}
        <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            {selectedBook && (
              <>
                <SheetHeader className="pb-4 border-b pr-8">
                  <SheetTitle className="flex justify-between items-center">
                    <span className="font-body text-xl font-semibold text-gray-900">{selectedBook.title}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setFormData(selectedBook);
                          setIsDetailSheetOpen(false);
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(selectedBook.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </SheetTitle>
                  <p className="font-body text-gray-500 mt-1">by {selectedBook.author}</p>
                </SheetHeader>

                <div className="mt-6 space-y-8">
                  {/* Book Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
                      <p className="font-body capitalize text-gray-900">{selectedBook.type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Genre</h4>
                      <p className="font-body text-gray-900">{selectedBook.genre || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Purpose</h4>
                      <p className="font-body text-gray-900">{PURPOSES.find(p => p.value === selectedBook.purpose)?.label || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                      <div className="flex flex-col gap-1">
                        <span className={`inline-block px-3 py-1 text-sm rounded-full w-fit ${getPriorityColor(selectedBook.priority)}`}>
                          {PRIORITIES.find(p => p.value === selectedBook.priority)?.label}
                        </span>
                        {selectedBook.priority === 'read' && selectedBook.completionDate && (
                          <p className="text-sm text-gray-500">
                            Completed: {new Date(selectedBook.completionDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Source & Reason */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Source & Reason</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedBook.source || 'Not specified'}</p>
                    </div>
                  </div>

                  {/* Comments section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Comments & Notes</h4>
                    <div className="space-y-4">
                      {selectedBook.comments.length > 0 ? (
                        selectedBook.comments.map(comment => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                            <p className="font-body text-gray-900 text-sm">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(comment.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No comments yet</p>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1"
                        />
                        <Button onClick={handleAddComment} className="self-end">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Metadata footer */}
                  <div className="text-xs text-gray-400 pt-4 border-t">
                    <p>Added: {new Date(selectedBook.createdAt).toLocaleString()}</p>
                    <p>Last updated: {new Date(selectedBook.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ReadingBacklogApp;