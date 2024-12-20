import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragdropService } from '../dragdrop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  // standalone: true,
  // imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class DragDroplistComponent implements OnInit {
  sections = [
    {
      title: 'Open',
      tasks: [
        {
          id: 'TASL001',
          title: 'Updation of SQCT Board',
          progress: 30,
          indicators: [false, true, true, true, true],
          Critical: 'H', //'High',
          PeriodIndicator: 'D' //'Daily'
        },
        {
          id: 'TASL002',
          title: 'Open PTAB reviews',
          progress: 50,
          indicators: [true, true, false, false, false],
          Critical: 'M', // 'Medium',
          PeriodIndicator: 'W' //'Weekly'
        },
      ],
    },
    {
      title: 'InProgress',
      tasks: [
        {
          id: 'TASL003',
          title: 'OEE / OLE reviews',
          progress: 70,
          indicators: [true, true, true, false, false],
          Critical: 'L', // 'Low',
          PeriodIndicator: 'M' // 'Monthly'
        },
        {
          id: 'TASL006',
          title: 'Generate OEE',
          progress: 60,
          indicators: [true, false, true, false, false],
          Critical: 'L', // 'Low',
          PeriodIndicator: 'Q' // 'Quaterly'
        },
      ],
    },
    {
      title: 'Completed',
      tasks: [
        {
          id: 'TASL004',
          title: 'Generate Kaizen',
          progress: 60,
          indicators: [true, false, true, false, false],
          Critical: 'L', // 'Low',
          PeriodIndicator: 'Q' // 'Quaterly'
        },
      ],
    },
    {
      title: 'Issue',
      tasks: [],
    },
  ];

  taskCompleteForm!: FormGroup;
  taskIssueForm!: FormGroup;
  selectedTask: any = null;
  ActivityTaskList: any[] = [];
  loading: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('IssuefileInput') IssuefileInput!: ElementRef;
  DraggedTask: any;
  searchData: { [key: string]: any } = {};
  filteredActivityTaskList: any[] = [];

  constructor(private dialog: MatDialog, private fb: FormBuilder,
    private dragDropService: DragdropService,
    private notificationService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getActivityTaskData();
    this.CreateForm();
  }

  CreateForm() {
    this.taskCompleteForm = this.fb.group({
      comments: ['', Validators.required],
      values: ['', Validators.required],
      attachent: ['', '']
    });
    this.taskIssueForm = this.fb.group({
      comments: ['', Validators.required],
      values: ['', Validators.required],
      issueType: ['', Validators.required],
      issue: ['', Validators.required],
      attachent: ['', '']
    });
  }



  onDrop(event: CdkDragDrop<any[]>) {
    console.log("drop event", event)

    // Identify the source and destination sections
    const previousSection = this.filteredActivityTaskList.find(section => section.tasks === event.previousContainer.data);
    const currentSection = this.filteredActivityTaskList.find(section => section.tasks === event.container.data);

    // Prevent moving tasks out of "Completed" section
    if (previousSection?.title === 'Completed' && currentSection?.title !== 'Completed') {
      console.log("Tasks in 'Completed' cannot be moved to other sections.");
      return;
    }

    if (event.previousContainer === event.container) {
      // Reorder tasks within the same section
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (previousSection && currentSection) {
      // Move task from one section to another
      this.DraggedTask = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log("Draged task", this.DraggedTask);

      switch (currentSection.title) {
        case 'Open':
          let payload = {
            Id: this.DraggedTask.id,
            ActivityId: this.DraggedTask.ActivityId,
            Code: this.DraggedTask.taskCode,
            status: 'Open',
            Value: '',
            Comment: null,
            IssueType: null,
            Issue: null,
            TaskAttachment: []
          }
          this.EditActiviyData(payload);
          break;

        case 'InProgress':
          let Inprogresspayload = {
            Id: this.DraggedTask.id,
            ActivityId: this.DraggedTask.ActivityId,
            Code: this.DraggedTask.taskCode,
            status: 'InProgress',
            Value: '',
            Comment: null,
            IssueType: null,
            Issue: null,
            TaskAttachment: []
          }
          this.EditActiviyData(Inprogresspayload);
          break;

        case 'Completed':
          this.selectedTask = null; // Close the dialog
          this.selectedTask = this.DraggedTask; // Set the selected task
          this.taskCompleteForm.patchValue({
            comments: this.DraggedTask.comments || '',
            values: this.DraggedTask.values || ''
          });
          break;

        case 'Issue':
          this.selectedTask = null; // Close the dialog
          this.selectedTask = this.DraggedTask; // Set the selected task
          this.taskIssueForm.patchValue({
            comments: this.DraggedTask.comments || '',
            values: this.DraggedTask.values || '',
            issueType: this.DraggedTask.issueType || '',
            issue: this.DraggedTask.issue || ''
          });
          break;

        default:
          console.log("Not valid section");
          break;
      }


      // Update the data or properties of the task based on the destination section
      this.DraggedTask.sectionTitle = currentSection.title; // Add or modify this based on your requirements
      //  console.log("task.sectionTitle", this.DraggedTask.sectionTitle);
    }

    // console.log("Updated ActivityTaskList:", this.ActivityTaskList);

  }

  getBackgroundColor(title: string): string {
    switch (title) {
      case 'Open':
        return '#1CC9CF';
      case 'In Progress':
        return '#FFDE59';
      case 'Completed':
        return '#9DE87E';
      default:
        return '#F57778'; // Default background color
    }
  }

  getCriticalBackgroundColor(type: string): string {
    if (type === 'H') {
      return 'Red'; // Background color for W
    } else if (type === 'M') {
      return '#FE9900'; // Background color for H
    }
    return '#5D58F3'; // Default color
  }



  // onTaskClick(task: any, sectionTitle: string): void {
  //   if (this.selectedTask === task) {
  //     this.selectedTask = null; // Close the dialog if it's already open for the same task
  //   }
  //   else {
  //     if (sectionTitle === 'Completed') {
  //       this.selectedTask = null; // Close the dialog
  //       this.selectedTask = task; // Set the selected task
  //       this.taskCompleteForm.patchValue({
  //         comments: task.comments || '',
  //         values: task.values || ''
  //       });
  //     }
  //     else if (sectionTitle === 'Issue') {
  //       this.selectedTask = null; // Close the dialog
  //       this.selectedTask = task; // Set the selected task
  //       this.taskIssueForm.patchValue({
  //         comments: task.comments || '',
  //         values: task.values || '',
  //         issueType: task.issueType || '',
  //         issue: task.issue || ''
  //       });
  //     }
  //   }

  // }

  submitCompleteForm(task: any): void {
    let formvalue = this.taskCompleteForm.value;
    if (formvalue.comments?.Trim || !formvalue.comments) {
      this.notificationService.error("Comment required")
      return;
    }
    else if (formvalue.values?.Trim || !formvalue.values) {
      this.notificationService.error("Value required")
      return;
    }
    else {
      // console.log('Form Data:', this.taskCompleteForm.value);
      let tempattachment: any[] = [];
      if (formvalue.attachent) {
        tempattachment.push({
          Id: 0,
          FilePath: formvalue.attachent?.FilePath,
          FileName: formvalue.attachent?.FileName,
        });
      }

      let payload = {
        Id: this.DraggedTask.id,
        ActivityId: this.DraggedTask.ActivityId,
        Code: this.DraggedTask.taskCode,
        status: 'Completed',
        Value: (formvalue.values).toString(),
        Comment: formvalue.comments,
        IssueType: null,
        Issue: null,
        TaskAttachment: tempattachment
      }
      this.EditActiviyData(payload);
      //console.log('Complete payload:', payload);

    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Triggers the hidden file input click
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      // Convert the file to Base64
      reader.onload = () => {
        const base64 = reader.result as string; // Base64 string
        const [meta, base64Data] = base64.split(',');

        //  console.log("Base data", meta);
        // console.log("Base data", base64Data);
        this.taskCompleteForm.patchValue({
          attachent: {
            FilePath: base64Data, //base64, // Store Base64 string
            FileName: file.name // Store the file name
          }
        });
      };

      reader.readAsDataURL(file); // Start the file reading process
    }
  }

  triggerIssueFileInput(): void {
    this.IssuefileInput.nativeElement.click(); // Triggers the hidden file input click
  }

  onIssueFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      // Convert the file to Base64
      reader.onload = () => {
        const base64 = reader.result as string; // Base64 string
        const [meta, base64Data] = base64.split(',');

        //  console.log("Base data", meta);
        // console.log("Base data", base64Data);
        this.taskIssueForm.patchValue({
          attachent: {
            FilePath: base64Data, //base64, // Store Base64 string
            FileName: file.name // Store the file name
          }
        });
      };

      reader.readAsDataURL(file); // Start the file reading process
    }
  }


  EditActiviyData(payload: any) {
    this.dragDropService.updateActivityTask(payload)
      .subscribe((result: any) => {
        // this.cancel();
        // this.ActivityTaskList = result;
        // console.log("Update activity ", result);
        this.selectedTask = null;
        this.getActivityTaskData();

      },
        (error) => {
          console.log(error);
        });
  }



  cancelCompleteDialog(): void {
    this.selectedTask = null; // Close the dialog
  }

  submitIssueForm(task: any): void {
    let formvalue = this.taskIssueForm.value;
    if (formvalue.comments?.Trim || !formvalue.comments) {
      this.notificationService.error("Comment required")
      return;
    }
    else if (formvalue.values?.Trim || !formvalue.values) {
      this.notificationService.error("Value required")
      return;
    }
    else if (formvalue.issueType?.Trim || !formvalue.issueType) {
      this.notificationService.error("Issue type required")
      return;
    }
    else if (formvalue.issue?.Trim || !formvalue.issue) {
      this.notificationService.error("Issue required")
      return;
    }
    else {
      //   console.log('Form Data:', this.taskIssueForm.value);
      let tempattachment: any[] = [];
      if (formvalue.attachent) {
        tempattachment.push({
          Id: 0,
          FilePath: formvalue.attachent?.FilePath,
          FileName: formvalue.attachent?.FileName,
        });
      }

      let payload = {
        Id: this.DraggedTask.id,
        ActivityId: this.DraggedTask.ActivityId,
        Code: this.DraggedTask.taskCode,
        status: 'Issue',
        Value: (formvalue.values).toString(),
        Comment: formvalue.comments,
        IssueType: formvalue.issueType,
        Issue: formvalue.issue,
        TaskAttachment: tempattachment
      }
      this.EditActiviyData(payload);
      //  console.log('Issue payload:', payload);

    }
  }

  cancelIssueDialog(): void {
    this.selectedTask = null; // Close the dialog
  }

  private getActivityTaskData() {
    this.loading = true;

    this.dragDropService.getActivityTaskKanbanList()
      .subscribe((result: any) => {
        // this.cancel();
        // this.ActivityTaskList = result;
        this.ActivityTaskList = this.transformApiResponse(result);
        this.filteredActivityTaskList = this.ActivityTaskList;
        this.loading = false;
        console.log("Activity Task list", this.ActivityTaskList);
        this.searchData = {};
      },
        (error) => {
          console.log(error);
          this.loading = false;
        });
  }


  transformApiResponse(data: any[]): any[] {
    const statusGroups: any = {
      Open: [],
      'InProgress': [],
      Completed: [],
      Issue: [],
    };

    data.forEach((item) => {
      const mappedItem = {
        id: item.id,
        ActivityId: item.activityId,
        taskCode: item.code,
        title: item.activityName,
        progress: this.getProgress(item.frequencyName), // Replace with actual logic
        indicators: this.getIndicators(), // Replace with actual logic
        Critical: this.getCriticalIndicator(item.activityPriority),
        PeriodIndicator: this.getPeriodIndicator(item.frequencyName),
        comment: item.comment,
        values: item.values,
        issueType: item.issueType,
        issue: item.issue,
        Instruction: item.activityDescription,
      };

      if (statusGroups[item.status]) {
        statusGroups[item.status].push(mappedItem);
      }
    });

    return Object.keys(statusGroups).map((status) => ({
      title: status,
      tasks: statusGroups[status],
    }));
  }

  getCriticalIndicator(priority: string): string {
    switch (priority) {
      case 'High':
        return 'H';
      case 'Medium':
        return 'M';
      case 'Low':
        return 'L';
      default:
        return '';
    }
  }

  getPeriodIndicator(frequency: string): string {
    switch (frequency) {
      case 'Daily':
        return 'D';
      case 'Weekly':
        return 'W';
      case 'Monthly':
        return 'M';
      case 'Quaterly':
        return 'Q';
      case 'HalfYearly':
        return 'H';
      case 'Yearly':
        return 'Y';
      default:
        return '';
    }
  }

  getProgress(frequency: any): number {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ...
    const currentDayOfMonth = currentDate.getDate(); // Day of the month (1-31)
    const currentMonth = currentDate.getMonth(); // 0 = January, ..., 11 = December
    const currentYear = currentDate.getFullYear();
console.log("current month", currentMonth)
    // Calculate total days in the current month
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let progress = 0;

    if (frequency === "Weekly") {
      // Weekly progress calculation
      progress = Math.round(((currentDayOfWeek + 1) / 7) * 100);
    } else if (frequency === "Monthly") {
      // Monthly progress calculation
      progress = Math.round((currentDayOfMonth / totalDaysInMonth) * 100);
    }else if (frequency === "Quaterly") {
      // Quarterly progress calculation (4 months per quarter)
      const currentQuarter = Math.ceil(currentMonth / 3); // Determine quarter (1 to 4)
      progress = Math.round(((currentMonth - (currentQuarter - 1) * 3) / 3) * 100);
    } else if (frequency === "HalfYearly") {
      // Half-Yearly progress calculation (6 months per half-year)
      const currentHalfYear = currentMonth <= 6 ? 1 : 2; // Determine half-year (1 or 2)
      progress = Math.round(((currentMonth - (currentHalfYear - 1) * 6) / 6) * 100);
    }  else if (frequency === "Yearly") {
      // Yearly progress calculation (12 months)
      progress = Math.round((currentMonth / 12) * 100);
    } else {
      progress = Math.floor(Math.random() * 100) + 1;
    }
 
    //console.log("progress", progress);
    // Replace this with actual logic if needed
    return progress;
  }

  getIndicators(): boolean[] {
    // Replace this with actual logic if needed
    return [true, false, true, true, false];
  }


  // Method to update search results based on emitted data from the search panel
  updateSearch(search: { [key: string]: any }) {
    // Store the search data
    this.searchData = { ...search };

    // Get the search text, converted to lowercase
    const searchText = this.searchData.searchText ? this.searchData.searchText.toLowerCase() : '';
    // Filter the tasks in ActivityTaskList
    this.filteredActivityTaskList = this.ActivityTaskList.map((group) => {
      const filteredTasks = group.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText)
      );

      // Always include the group title, with either filtered tasks or an empty array
      return {
        title: group.title,
        tasks: filteredTasks, // Either matching tasks or an empty array
      };
    });
    // Debugging output
    // console.log("Filtered Activity Task List:", this.filteredActivityTaskList);

  }


}
