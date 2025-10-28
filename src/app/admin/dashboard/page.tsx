"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Submission type definition
interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  exposurePeriod?: string;
  medicalCondition?: string;
  additionalInfo?: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  trustedFormCertUrl?: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, [pagination.page, search]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/submissions?page=${pagination.page}&limit=${pagination.limit}&search=${search}`
      );

      if (!response.ok) throw new Error("Failed to fetch submissions");

      const data = await response.json();
      setSubmissions(data.submissions);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSubmissions();
  };

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submissions Dashboard</CardTitle>
            <CardDescription>
              View and manage all contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <Input
                placeholder="Search name, email, or case type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No submissions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission) => (
                      <TableRow key={submission._id}>
                        <TableCell>
                          {submission.firstName} {submission.lastName}
                        </TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{submission.caseType}</Badge>
                        </TableCell>
                        <TableCell>{submission.ipAddress}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(submission)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {loading && submissions.length > 0 && (
              <div className="flex justify-center my-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page <= 1}
                    variant="outline"
                    size="sm"
                  >
                    <PaginationPrevious />
                  </Button>
                </PaginationItem>

                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const pageNum = pagination.page <= 3
                    ? i + 1
                    : pagination.page + i - 2;

                  if (pageNum <= pagination.pages) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === pagination.page}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <Button
                    onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                    disabled={pagination.page >= pagination.pages}
                    variant="outline"
                    size="sm"
                  >
                    <PaginationNext />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </main>

      {/* Submission Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Complete information about this contact form submission
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500">Personal Information</h3>
                <p><span className="font-medium">Name:</span> {selectedSubmission.firstName} {selectedSubmission.lastName}</p>
                <p><span className="font-medium">Email:</span> {selectedSubmission.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedSubmission.phone}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500">TrustedForm</h3>
                <p><span className="font-medium">Cert URL:</span> {selectedSubmission.trustedFormCertUrl ? <a href={selectedSubmission.trustedFormCertUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Certificate</a> : "Not provided"}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500">Case Information</h3>
                <p><span className="font-medium">Case Type:</span> {selectedSubmission.caseType}</p>
                {selectedSubmission.exposurePeriod && (
                  <p><span className="font-medium">Exposure Period:</span> {selectedSubmission.exposurePeriod}</p>
                )}
                {selectedSubmission.medicalCondition && (
                  <p><span className="font-medium">Medical Condition:</span> {selectedSubmission.medicalCondition}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <h3 className="font-medium text-sm text-gray-500">Additional Information</h3>
                <p className="whitespace-pre-line">{selectedSubmission.additionalInfo || "No additional information provided."}</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <h3 className="font-medium text-sm text-gray-500">Technical Information</h3>
                <p><span className="font-medium">IP Address:</span> {selectedSubmission.ipAddress}</p>
                <p><span className="font-medium">User Agent:</span> {selectedSubmission.userAgent}</p>
                <p><span className="font-medium">Submitted:</span> {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
