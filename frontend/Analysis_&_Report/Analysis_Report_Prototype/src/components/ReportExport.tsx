import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Download, FileText, FileSpreadsheet, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const reportTemplates = [
  {
    id: "student-progress",
    name: "Student Progress Report",
    description: "Detailed analysis of individual student performance",
    icon: FileText,
  },
  {
    id: "class-overview",
    name: "Class Overview Report",
    description: "Aggregate statistics and trends for entire class",
    icon: FileSpreadsheet,
  },
  {
    id: "task-completion",
    name: "Task Completion Report",
    description: "Summary of completed, pending, and overdue tasks",
    icon: CheckCircle2,
  },
  {
    id: "attendance",
    name: "Attendance Report",
    description: "Student attendance records and patterns",
    icon: CalendarIcon,
  },
];

export function ReportExport() {
  const [selectedTemplate, setSelectedTemplate] = useState("student-progress");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [exportFormat, setExportFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("all");

  const handleExport = () => {
    // Mock export functionality
    alert(`Exporting report as ${exportFormat.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Report Templates */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-primary bg-accent"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className="w-8 h-8 text-primary mb-2" />
                  {selectedTemplate === template.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Report Configuration */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Customize your report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div className="space-y-3">
              <Label>Date Range</Label>
              <div className="flex gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Grade Filter */}
            <div className="space-y-3">
              <Label htmlFor="grade-select">Grade Level</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger id="grade-select">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9th">9th Grade</SelectItem>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Format */}
            <div className="space-y-3">
              <Label>Export Format</Label>
              <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf" className="font-normal cursor-pointer">
                    PDF Document
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="font-normal cursor-pointer">
                    Excel Spreadsheet
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="font-normal cursor-pointer">
                    CSV File
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <Label>Additional Options</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                  />
                  <Label htmlFor="charts" className="font-normal cursor-pointer">
                    Include charts and visualizations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="comments"
                    checked={includeComments}
                    onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
                  />
                  <Label htmlFor="comments" className="font-normal cursor-pointer">
                    Include tutor comments and notes
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
            <CardDescription>Summary of selected report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <p className="mt-1">
                {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
              </p>
            </div>

            <div>
              <Label>Date Range</Label>
              <p className="mt-1 text-muted-foreground">
                {dateFrom && dateTo
                  ? `${format(dateFrom, "PP")} - ${format(dateTo, "PP")}`
                  : "No date range selected"}
              </p>
            </div>

            <div>
              <Label>Grade Level</Label>
              <p className="mt-1">
                <Badge variant="outline">
                  {selectedGrade === "all" ? "All Grades" : selectedGrade}
                </Badge>
              </p>
            </div>

            <div>
              <Label>Format</Label>
              <p className="mt-1">
                <Badge>{exportFormat.toUpperCase()}</Badge>
              </p>
            </div>

            <div>
              <Label>Includes</Label>
              <div className="mt-2 space-y-1">
                {includeCharts && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Charts and visualizations</span>
                  </div>
                )}
                {includeComments && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Tutor comments and notes</span>
                  </div>
                )}
              </div>
            </div>

            <Button className="w-full mt-6 bg-[#186AC7] hover:bg-[#145591]" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Student Progress Report - October 2025", date: "2025-10-10", format: "PDF" },
              { name: "Class Overview Report - Q3 2025", date: "2025-10-01", format: "Excel" },
              { name: "Task Completion Report - September 2025", date: "2025-09-28", format: "PDF" },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p>{report.name}</p>
                    <p className="text-sm text-muted-foreground">Generated on {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.format}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
