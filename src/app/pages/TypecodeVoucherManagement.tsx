import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Plus, X } from 'lucide-react';

type Tab = 'drafts' | 'submissions' | 'viewall';

interface DraftItem {
  id: string;
  code: string;
  type: 'typecode' | 'voucher';
  description: string;
  lastModified: string;
  modifiedBy: string;
  businessArea: string;
  // Voucher fields
  voucherType?: string;
  longDescription?: string;
  shortDescription?: string;
  glCode?: string;
  closingType?: string;
  balanceZero?: boolean;
  linkToTypecode?: string;
  // Type code fields
  categoryId?: string;
  financialType?: string;
  transactionType?: string;
  gratuityPercent?: number;
  shorexSalesCategory?: string;
  linkToVoucherId?: string;
  // Type code checkboxes
  isRefundable?: boolean;
  factorOnboardCredits?: boolean;
  showAccountCharges?: boolean;
  showGuestPayments?: boolean;
  isCreditCard?: boolean;
  isTenderType?: boolean;
  autoVoucher?: boolean;
  isShorexTransaction?: boolean;
  discountable?: boolean;
  // Submission specific
  submissionStatus?: 'Approved' | 'Pending Approval' | 'Rejected';
  submittedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  approvalNotes?: string;
  rejectionNotes?: string;
}

const mockDrafts: DraftItem[] = [
  {
    id: '1',
    code: 'CS',
    type: 'typecode',
    description: 'Casino Services',
    lastModified: '2026-03-17 14:32',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Casino',
    isRefundable: true,
    showAccountCharges: true,
    isCreditCard: true
  },
  {
    id: '2',
    code: 'SL',
    type: 'typecode',
    description: 'Shore Excursion - Land',
    lastModified: '2026-03-16 10:15',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Shore Excursion',
    factorOnboardCredits: true,
    isShorexTransaction: true
  },
  {
    id: '3',
    code: 'S4',
    type: 'typecode',
    description: 'Spa Services Premium',
    lastModified: '2026-03-15 16:45',
    modifiedBy: 'JSmith',
    businessArea: 'Spa',
    isRefundable: true,
    showGuestPayments: true,
    discountable: true
  },
  {
    id: '4',
    code: 'P345',
    type: 'voucher',
    description: 'Photo Package Voucher',
    lastModified: '2026-03-14 09:22',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Photo',
    balanceZero: true
  },
  {
    id: '5',
    code: 'R345',
    type: 'voucher',
    description: 'Restaurant Credit Voucher',
    lastModified: '2026-03-13 11:30',
    modifiedBy: 'AJohnson',
    businessArea: 'Hardings'
  },
  {
    id: '6',
    code: 'R432',
    type: 'voucher',
    description: 'Retail Discount Voucher',
    lastModified: '2026-03-12 15:10',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Medical',
    balanceZero: true
  },
  {
    id: '7',
    code: 'PT',
    type: 'typecode',
    description: 'Photo Services - Traditional',
    lastModified: '2026-03-11 13:20',
    modifiedBy: 'JSmith',
    businessArea: 'Photo',
    isTenderType: true,
    autoVoucher: true
  },
  {
    id: '8',
    code: 'HD',
    type: 'typecode',
    description: 'Hardings Fine Jewelry',
    lastModified: '2026-03-10 08:45',
    modifiedBy: 'AJohnson',
    businessArea: 'Hardings',
    showAccountCharges: true,
    showGuestPayments: true
  },
  {
    id: '9',
    code: 'MD',
    type: 'typecode',
    description: 'Medical Services - Consultation',
    lastModified: '2026-03-09 16:30',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Medical',
    isRefundable: true,
    factorOnboardCredits: true,
    showAccountCharges: true
  },
  {
    id: '10',
    code: 'SE',
    type: 'typecode',
    description: 'Shore Excursion - Extended',
    lastModified: '2026-03-08 12:15',
    modifiedBy: 'JSmith',
    businessArea: 'Shore Excursion',
    isShorexTransaction: true,
    discountable: true
  },
  {
    id: '11',
    code: 'C789',
    type: 'voucher',
    description: 'Casino Promotional Credit',
    lastModified: '2026-03-07 10:40',
    modifiedBy: 'AJohnson',
    businessArea: 'Casino'
  },
  {
    id: '12',
    code: 'S567',
    type: 'voucher',
    description: 'Spa Treatment Discount',
    lastModified: '2026-03-06 14:55',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Spa',
    balanceZero: true
  },
  {
    id: '13',
    code: 'X123',
    type: 'voucher',
    description: 'Shore Excursion Upgrade',
    lastModified: '2026-03-05 09:10',
    modifiedBy: 'JSmith',
    businessArea: 'Shore Excursion'
  },
  {
    id: '14',
    code: 'H890',
    type: 'voucher',
    description: 'Hardings Shopping Voucher',
    lastModified: '2026-03-04 11:25',
    modifiedBy: 'AJohnson',
    businessArea: 'Hardings'
  }
];

const mockSubmissions: DraftItem[] = [
    {
    id: 'sub1',
    code: 'BR',
    type: 'typecode',
    description: 'Bar Revenue - All Locations',
    lastModified: '2026-03-17 09:15',
    modifiedBy: 'Sarah Connor',
    businessArea: 'Bar',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-17 09:30',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-17 09:45',
    approvalNotes: 'Good, but I had to change the ships this would be going to and effective/expiry dates.',
    categoryId: 'BAR01',
    longDescription: 'Bar Revenue - All Locations',
    shortDescription: 'Bar Rev',
    financialType: 'Revenue',
    transactionType: 'Sale',
    gratuityPercent: 18,
    isRefundable: true,
    showAccountCharges: true,
    showGuestPayments: true
  },
    {
    id: 'sub2',
    code: 'DG',
    type: 'typecode',
    description: 'Dining Room Gratuity',
    lastModified: '2026-03-16 14:20',
    modifiedBy: 'Peter Parker',
    businessArea: 'Dining',
    submissionStatus: 'Pending Approval',
    submittedDate: '2026-03-16 14:45',
    categoryId: 'DINE02',
    longDescription: 'Dining Room Gratuity Charges',
    shortDescription: 'Dine Grat',
    financialType: 'Revenue',
    transactionType: 'Gratuity',
    gratuityPercent: 15,
    factorOnboardCredits: true,
    showAccountCharges: true
  },
    {
    id: 'sub3',
    code: 'WF',
    type: 'typecode',
    description: 'WiFi Service Charges',
    lastModified: '2026-03-15 11:30',
    modifiedBy: 'Miles Morales',
    businessArea: 'Internet',
    submissionStatus: 'Rejected',
    submittedDate: '2026-03-15 12:00',
    rejectedBy: 'Bob Brown',
    rejectedDate: '2026-03-15 12:15',
    rejectionNotes: 'GL Code mapping is incorrect. Please review the financial type code structure and resubmit.',
    categoryId: 'TECH01',
    longDescription: 'WiFi Internet Service Charges',
    shortDescription: 'WiFi',
    financialType: 'Revenue',
    transactionType: 'Service',
    isRefundable: false,
    showAccountCharges: true,
    showGuestPayments: true,
    isCreditCard: true
  },
    {
    id: 'sub4',
    code: 'GC',
    type: 'typecode',
    description: 'Gift Shop - Clothing',
    lastModified: '2026-03-14 16:45',
    modifiedBy: 'Sarah Connor',
    businessArea: 'Retail',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-14 17:00',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-14 17:15',
    approvalNotes: 'Approved with minor adjustments to the discountable category configuration.',
    categoryId: 'GIFT03',
    longDescription: 'Gift Shop Clothing and Accessories',
    shortDescription: 'Gift Clth',
    financialType: 'Revenue',
    transactionType: 'Sale',
    isRefundable: true,
    showAccountCharges: true,
    discountable: true
  },
    {
    id: 'sub5',
    code: 'LA',
    type: 'typecode',
    description: 'Laundry Services',
    lastModified: '2026-03-13 10:20',
    modifiedBy: 'Peter Parker',
    businessArea: 'Services',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-13 10:45',
    approvedBy: 'Bob Brown',
    approvedDate: '2026-03-13 11:00',
    approvalNotes: 'Looks good. Updated the pricing tiers to align with new 2026 service rates.',
    categoryId: 'SERV01',
    longDescription: 'Guest Laundry and Dry Cleaning Services',
    shortDescription: 'Laundry',
    financialType: 'Revenue',
    transactionType: 'Service',
    showAccountCharges: true,
    showGuestPayments: true
  },
    {
    id: 'sub6',
    code: 'V789',
    type: 'voucher',
    description: 'Spa Treatment Upgrade Voucher',
    lastModified: '2026-03-12 13:15',
    modifiedBy: 'Miles Morales',
    businessArea: 'Spa',
    submissionStatus: 'Pending Approval',
    submittedDate: '2026-03-12 13:30',
    voucherType: 'Upgrade',
    longDescription: 'Spa Treatment Upgrade Voucher - Premium',
    shortDescription: 'Spa Upgrade',
    glCode: '5400-230',
    closingType: 'Daily',
    balanceZero: true,
    linkToTypecode: 'S4'
  },
    {
    id: 'sub7',
    code: 'V234',
    type: 'voucher',
    description: 'Beverage Package Credit',
    lastModified: '2026-03-11 09:40',
    modifiedBy: 'Sarah Connor',
    businessArea: 'Bar',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-11 10:00',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-11 10:15',
    approvalNotes: 'Approved. Changed expiry date to align with beverage package promotion end date.',
    voucherType: 'Credit',
    longDescription: 'Beverage Package Daily Credit Voucher',
    shortDescription: 'Bev Credit',
    glCode: '5100-145',
    closingType: 'Daily',
    balanceZero: false,
    linkToTypecode: 'BR'
  },
    {
    id: 'sub8',
    code: 'FT',
    type: 'typecode',
    description: 'Fitness Center Services',
    lastModified: '2026-03-10 15:25',
    modifiedBy: 'Peter Parker',
    businessArea: 'Fitness',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-10 16:00',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-10 16:15',
    approvalNotes: 'Approved. Minor corrections made to class schedule integration settings.',
    categoryId: 'FIT01',
    longDescription: 'Fitness Center Classes and Services',
    shortDescription: 'Fitness',
    financialType: 'Revenue',
    transactionType: 'Service',
    isRefundable: true,
    showAccountCharges: true,
    showGuestPayments: true
  },
    {
    id: 'sub9',
    code: 'V456',
    type: 'voucher',
    description: 'Specialty Dining Voucher',
    lastModified: '2026-03-09 11:10',
    modifiedBy: 'Miles Morales',
    businessArea: 'Dining',
    submissionStatus: 'Rejected',
    submittedDate: '2026-03-09 11:45',
    rejectedBy: 'Bob Brown',
    rejectedDate: '2026-03-09 12:00',
    rejectionNotes: 'Missing restaurant code mappings. Please add all specialty dining venues before resubmitting.',
    voucherType: 'Dining',
    longDescription: 'Specialty Restaurant Dining Voucher',
    shortDescription: 'Spec Dining',
    glCode: '5200-178',
    closingType: 'Voyage',
    balanceZero: true,
    linkToTypecode: 'DG'
  },
    {
    id: 'sub10',
    code: 'AW',
    type: 'typecode',
    description: 'Art Walk Purchases',
    lastModified: '2026-03-08 14:50',
    modifiedBy: 'Sarah Connor',
    businessArea: 'Art',
    submissionStatus: 'Pending Approval',
    submittedDate: '2026-03-08 15:15',
    categoryId: 'ART01',
    longDescription: 'Art Walk Gallery Purchases and Auctions',
    shortDescription: 'Art Walk',
    financialType: 'Revenue',
    transactionType: 'Sale',
    gratuityPercent: 0,
    isRefundable: false,
    showAccountCharges: true,
    discountable: false
  },
    {
    id: 'sub11',
    code: 'V890',
    type: 'voucher',
    description: 'Internet Minutes Package',
    lastModified: '2026-03-07 10:30',
    modifiedBy: 'Peter Parker',
    businessArea: 'Internet',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-07 11:00',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-07 11:15',
    approvalNotes: 'Good. Updated ship assignments to include new vessels in the fleet.',
    voucherType: 'Service',
    longDescription: 'Prepaid Internet Minutes Package Voucher',
    shortDescription: 'Internet Pkg',
    glCode: '5500-290',
    closingType: 'Voyage',
    balanceZero: false,
    linkToTypecode: 'WF'
  },
    {
    id: 'sub12',
    code: 'MC',
    type: 'typecode',
    description: 'Mini Bar Charges',
    lastModified: '2026-03-06 16:20',
    modifiedBy: 'Miles Morales',
    businessArea: 'Mini Bar',
    submissionStatus: 'Approved',
    submittedDate: '2026-03-06 17:00',
    approvedBy: 'Alice Johnson',
    approvedDate: '2026-03-06 17:15',
    approvalNotes: 'Approved with inventory tracking flag enabled per new requirements.',
    categoryId: 'MINI01',
    longDescription: 'Stateroom Mini Bar Beverage Charges',
    shortDescription: 'Mini Bar',
    financialType: 'Revenue',
    transactionType: 'Sale',
    showAccountCharges: true,
    showGuestPayments: true,
    isCreditCard: true
  }
];

export function TypecodeVoucherManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('drafts');
  const [filterType, setFilterType] = useState<'all' | 'typecode' | 'voucher'>('all');
  const [filterTypecode, setFilterTypecode] = useState('');
  const [filterTypecodeDesc, setFilterTypecodeDesc] = useState('');
  const [filterVoucherNumber, setFilterVoucherNumber] = useState('');
  const [filterVoucherDesc, setFilterVoucherDesc] = useState('');
  const [filterBusinessArea, setFilterBusinessArea] = useState('all');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showManageNote, setShowManageNote] = useState(false);
  const [filterSubmissionStatus, setFilterSubmissionStatus] = useState<'all' | 'Approved' | 'Pending Approval' | 'Rejected'>('all');
  const [filterActiveStatus, setFilterActiveStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [librarySortBy, setLibrarySortBy] = useState<'typecode' | 'voucherid'>('typecode');
  const [drafts, setDrafts] = useState<DraftItem[]>(mockDrafts);
  const [submissions, setSubmissions] = useState<DraftItem[]>(mockSubmissions);
  const [submissionToMove, setSubmissionToMove] = useState<DraftItem | null>(null);
  const [showMoveConfirm, setShowMoveConfirm] = useState(false);
  const [showOpenDraftConfirm, setShowOpenDraftConfirm] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [submissionToReject, setSubmissionToReject] = useState<DraftItem | null>(null);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [selectedLibraryRow, setSelectedLibraryRow] = useState<null | {
    // shared / display
    area: string; updated: string; active: string;
    // type code fields
    tc: string; tcDesc: string; tcShortDesc: string; catId: string; fin: string;
    transType: string; gratuity: string; shorexCat: string; linkToVid: string;
    refundable: boolean; factorOBC: boolean; showAcct: boolean; showGuest: boolean;
    isCreditCard: boolean; isTender: boolean; autoVoucher: boolean; isShorex: boolean; discountable: boolean;
    // voucher fields
    vid: string; vidDesc: string; vidShortDesc: string; vidType: string;
    glCode: string; close: string; bal0: boolean; linkToTc: string;
    cat: string;
  }>(null);

  // Check for success message from localStorage
  useEffect(() => {
    const message = localStorage.getItem('successMessage');
    if (message) {
      setSuccessMessageText(message);
      setShowSuccessMessage(true);
      localStorage.removeItem('successMessage');
      setTimeout(() => setShowSuccessMessage(false), 1000);
    }
    
    // Check for openDraftId from localStorage
    const openDraftId = localStorage.getItem('openDraftId');
    if (openDraftId) {
      const draft = mockDrafts.find(d => d.id === openDraftId);
      if (draft) {
        setSelectedDraft(draft);
      }
      localStorage.removeItem('openDraftId');
    }
  }, []);

  // Filter the drafts based on current filters
  const filteredDrafts = drafts.filter((draft) => {
    // Type filter
    if (filterType !== 'all' && draft.type !== filterType) {
      return false;
    }

    // Business Area filter
    if (filterBusinessArea !== 'all' && draft.businessArea !== filterBusinessArea) {
      return false;
    }

    // Typecode filter
    if (filterTypecode && draft.type === 'typecode' && !draft.code.toLowerCase().includes(filterTypecode.toLowerCase())) {
      return false;
    }

    // Typecode description filter
    if (filterTypecodeDesc && draft.type === 'typecode' && !draft.description.toLowerCase().includes(filterTypecodeDesc.toLowerCase())) {
      return false;
    }

    // Voucher number filter
    if (filterVoucherNumber && draft.type === 'voucher' && !draft.code.toLowerCase().includes(filterVoucherNumber.toLowerCase())) {
      return false;
    }

    // Voucher description filter
    if (filterVoucherDesc && draft.type === 'voucher' && !draft.description.toLowerCase().includes(filterVoucherDesc.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort the filtered drafts based on sortOrder
  const sortedDrafts = filteredDrafts.sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    } else {
      return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
    }
  });

  // Filter the submissions based on current filters
  const filteredSubmissions = submissions.filter((submission) => {
    // Type filter
    if (filterType !== 'all' && submission.type !== filterType) {
      return false;
    }

    // Business Area filter
    if (filterBusinessArea !== 'all' && submission.businessArea !== filterBusinessArea) {
      return false;
    }

    // Submission Status filter
    if (filterSubmissionStatus !== 'all' && submission.submissionStatus !== filterSubmissionStatus) {
      return false;
    }

    // Typecode filter
    if (filterTypecode && submission.type === 'typecode' && !submission.code.toLowerCase().includes(filterTypecode.toLowerCase())) {
      return false;
    }

    // Typecode description filter
    if (filterTypecodeDesc && submission.type === 'typecode' && !submission.description.toLowerCase().includes(filterTypecodeDesc.toLowerCase())) {
      return false;
    }

    // Voucher number filter
    if (filterVoucherNumber && submission.type === 'voucher' && !submission.code.toLowerCase().includes(filterVoucherNumber.toLowerCase())) {
      return false;
    }

    // Voucher description filter
    if (filterVoucherDesc && submission.type === 'voucher' && !submission.description.toLowerCase().includes(filterVoucherDesc.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort the filtered submissions based on status first, then sortOrder
  const sortedSubmissions = filteredSubmissions.sort((a, b) => {
    // First priority: group by status (Pending Approval, Rejected, Approved)
    const statusOrder = { 'Pending Approval': 1, 'Rejected': 2, 'Approved': 3 };
    const statusA = statusOrder[a.submissionStatus!];
    const statusB = statusOrder[b.submissionStatus!];
    
    if (statusA !== statusB) {
      return statusA - statusB;
    }
    
    // Second priority: sort by date within each status group
    if (sortOrder === 'newest') {
      return new Date(b.submittedDate!).getTime() - new Date(a.submittedDate!).getTime();
    } else {
      return new Date(a.submittedDate!).getTime() - new Date(b.submittedDate!).getTime();
    }
  });

  // Handler functions for submission actions
  const handleMoveBackToDrafts = (submission: DraftItem) => {
    setSubmissionToMove(submission);
    setShowMoveConfirm(true);
  };

  const handleRejectSubmission = (submission: DraftItem) => {
    setSubmissionToReject(submission);
    setShowRejectConfirm(true);
  };

  const confirmMoveToDrafts = (openAsDraft: boolean) => {
    if (submissionToMove) {
      // Create a new draft item from the submission (removing submission-specific fields)
      const newDraft: DraftItem = {
        ...submissionToMove,
        submissionStatus: undefined,
        submittedDate: undefined,
        approvedBy: undefined,
        approvedDate: undefined,
        rejectedBy: undefined,
        rejectedDate: undefined,
        approvalNotes: undefined,
        rejectionNotes: undefined,
        lastModified: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };

      // Add to drafts and remove from submissions
      setDrafts([newDraft, ...drafts]);
      setSubmissions(submissions.filter(s => s.id !== submissionToMove.id));
      
      setShowMoveConfirm(false);
      
      if (openAsDraft) {
        setShowOpenDraftConfirm(false);
        setActiveTab('drafts');
        setSelectedDraft(newDraft);
      } else {
        setShowOpenDraftConfirm(false);
      }
      
      setSubmissionToMove(null);
      setSuccessMessageText('Successfully moved submission back to drafts');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <Header showMenu showUserProfile />

      <main className="flex-1 p-8">
        {/* Tab Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm" style={{ border: '1px solid #e0e0e0' }}>
            <button
              onClick={() => setActiveTab('drafts')}
              className="px-10 py-4 font-medium transition-colors text-base"
              style={{
                color: activeTab === 'drafts' ? '#1e3a5f' : '#666666',
                backgroundColor: activeTab === 'drafts' ? '#b3d9f2' : 'transparent',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                borderRight: '1px solid #e0e0e0'
              }}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className="px-10 py-4 font-medium transition-colors text-base"
              style={{
                color: activeTab === 'submissions' ? '#1e3a5f' : '#666666',
                backgroundColor: activeTab === 'submissions' ? '#b3d9f2' : 'transparent',
                borderRight: '1px solid #e0e0e0'
              }}
            >
              Submissions
            </button>
            <button
              onClick={() => setActiveTab('viewall')}
              className="px-10 py-4 font-medium transition-colors text-base"
              style={{
                color: activeTab === 'viewall' ? '#1e3a5f' : '#666666',
                backgroundColor: activeTab === 'viewall' ? '#b3d9f2' : 'transparent',
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px'
              }}
            >
              Type Code & Voucher Library
            </button>
          </div>
        </div>

        {/* Drafts Content */}
        {activeTab === 'drafts' && (
          <div>
            {/* Create New Buttons */}
            <div className="flex flex-col items-center mb-8 gap-4">
              <button
                className="flex items-center gap-3 px-10 py-5 rounded-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: '#1e3a5f',
                  fontSize: '20px',
                  transform: 'scale(1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#2a4f7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#1e3a5f';
                }}
                onClick={() => navigate('/create-new-TV')}
              >
                <Plus size={24} />
                Create New Type Code or Voucher
              </button>
              
              <button
                className="flex items-center gap-3 px-10 py-4 rounded-lg font-semibold transition-all"
                style={{ 
                  backgroundColor: '#b3d9f2',
                  color: '#1e3a5f',
                  fontSize: '18px',
                  border: '2px solid #1e3a5f'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#9ec9e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#b3d9f2';
                }}
                onClick={() => setShowManageNote(true)}
              >
                Manage Existing Type Code or Voucher
              </button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Type:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'typecode' | 'voucher')}
                >
                  <option value="all">All</option>
                  <option value="typecode">Type Code</option>
                  <option value="voucher">Voucher</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Business Area:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={filterBusinessArea}
                  onChange={(e) => setFilterBusinessArea(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Casino">Casino</option>
                  <option value="Spa">Spa</option>
                  <option value="Photo">Photo</option>
                  <option value="Medical">Medical</option>
                  <option value="Hardings">Hardings</option>
                  <option value="Effy">Effy</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Shore Excursion">Shore Excursion</option>
                </select>
              </div>
              {filterType === 'typecode' && (
                <>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Type Code:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterTypecode}
                      onChange={(e) => setFilterTypecode(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Description:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterTypecodeDesc}
                      onChange={(e) => setFilterTypecodeDesc(e.target.value)}
                    />
                  </div>
                </>
              )}
              {filterType === 'voucher' && (
                <>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Voucher Number:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterVoucherNumber}
                      onChange={(e) => setFilterVoucherNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Description:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterVoucherDesc}
                      onChange={(e) => setFilterVoucherDesc(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Sort By:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                >
                  <option value="newest">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Draft Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={() => setSelectedDraft(draft)}
                  className="bg-white rounded-lg shadow-sm p-5 border hover:shadow-md transition-shadow cursor-pointer"
                  style={{ borderColor: '#e0e0e0' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                        {draft.code}
                      </h3>
                      <span
                        className="inline-block px-2 py-1 rounded text-xs font-medium mt-1"
                        style={{
                          backgroundColor: draft.type === 'typecode' ? '#e3f2fd' : '#fff3e0',
                          color: draft.type === 'typecode' ? '#1565c0' : '#e65100'
                        }}
                      >
                        {draft.type === 'typecode' ? 'Type Code' : 'Voucher'}
                      </span>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: '#f5f5f5', color: '#666666' }}
                    >
                      Draft
                    </span>
                  </div>

                  <p className="text-sm mb-4" style={{ color: '#333333' }}>
                    {draft.description}
                  </p>

                  <div className="pt-3 border-t" style={{ borderColor: '#e0e0e0' }}>
                    <div className="flex justify-between text-xs" style={{ color: '#666666' }}>
                      <span>Modified: {draft.lastModified}</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#666666' }}>
                      Business Area: {draft.businessArea}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submissions Content */}
        {activeTab === 'submissions' && (
          <div>
            {/* Filter Options */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Type:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'typecode' | 'voucher')}
                >
                  <option value="all">All</option>
                  <option value="typecode">Type Code</option>
                  <option value="voucher">Voucher</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Business Area:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={filterBusinessArea}
                  onChange={(e) => setFilterBusinessArea(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Casino">Casino</option>
                  <option value="Spa">Spa</option>
                  <option value="Photo">Photo</option>
                  <option value="Medical">Medical</option>
                  <option value="Hardings">Hardings</option>
                  <option value="Effy">Effy</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Shore Excursion">Shore Excursion</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Submission Status:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={filterSubmissionStatus}
                  onChange={(e) => setFilterSubmissionStatus(e.target.value as 'all' | 'Approved' | 'Pending Approval' | 'Rejected')}
                >
                  <option value="all">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              {filterType === 'typecode' && (
                <>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Type Code:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterTypecode}
                      onChange={(e) => setFilterTypecode(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Description:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterTypecodeDesc}
                      onChange={(e) => setFilterTypecodeDesc(e.target.value)}
                    />
                  </div>
                </>
              )}
              {filterType === 'voucher' && (
                <>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Voucher Number:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterVoucherNumber}
                      onChange={(e) => setFilterVoucherNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-500">Description:</label>
                    <input
                      className="px-3 py-2 border rounded"
                      type="text"
                      value={filterVoucherDesc}
                      onChange={(e) => setFilterVoucherDesc(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-500">Sort By:</label>
                <select
                  className="px-3 py-2 border rounded"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                >
                  <option value="newest">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Submission Cards by Status Group */}
            <div className="space-y-8">
              {/* Pending Approval Section */}
              {sortedSubmissions.filter(s => s.submissionStatus === 'Pending Approval').length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#1e3a5f' }}>
                    Submissions Pending Approval
                  </h2>
                  <div className="mb-4" style={{ borderBottom: '2px solid #1e3a5f' }}></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedSubmissions
                      .filter(s => s.submissionStatus === 'Pending Approval')
                      .map((submission) => (
                        <div
                          key={submission.id}
                          onClick={() => setSelectedDraft(submission)}
                          className="bg-white rounded-lg shadow-sm p-5 border hover:shadow-md transition-shadow cursor-pointer"
                          style={{ borderColor: '#e0e0e0' }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                                {submission.code}
                              </h3>
                              <span
                                className="inline-block px-2 py-1 rounded text-xs font-medium mt-1"
                                style={{
                                  backgroundColor: submission.type === 'typecode' ? '#e3f2fd' : '#fff3e0',
                                  color: submission.type === 'typecode' ? '#1565c0' : '#e65100'
                                }}
                              >
                                {submission.type === 'typecode' ? 'Type Code' : 'Voucher'}
                              </span>
                            </div>
                            <span
                              className="px-2 py-1 rounded text-xs font-medium"
                              style={{ 
                                backgroundColor: '#f9a825',
                                color: '#ffffff'
                              }}
                            >
                              {submission.submissionStatus}
                            </span>
                          </div>

                          <p className="text-sm mb-4" style={{ color: '#333333' }}>
                            {submission.description}
                          </p>

                        <div className="pt-3 border-t" style={{ borderColor: '#e0e0e0' }}>
                            <div className="text-xs mb-1" style={{ color: '#666666' }}>Submitted by: {submission.modifiedBy}</div>
                            <div className="flex justify-between text-xs" style={{ color: '#666666' }}>
                              <span>Submitted: {submission.submittedDate}</span>
                            </div>
                            <div className="text-xs mt-1 mb-3" style={{ color: '#666666' }}>
                              Business Area: {submission.businessArea}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-3 justify-center">
                                <button
                                className="px-3 py-1.5 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRejectSubmission(submission);
                                }}
                              >
                                Reject
                              </button>
                              <button
                                className="px-3 py-1.5 text-xs font-medium rounded text-white hover:opacity-90"
                                style={{ backgroundColor: '#7cb342' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSuccessMessageText('Submission Approved');
                                    setShowSuccessMessage(true);
                                    setTimeout(() => setShowSuccessMessage(false), 2000);
                                }}
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Rejected Section */}
              {sortedSubmissions.filter(s => s.submissionStatus === 'Rejected').length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#1e3a5f' }}>
                    Rejected Submissions
                  </h2>
                  <div className="mb-4" style={{ borderBottom: '2px solid #1e3a5f' }}></div>
                  <div className="space-y-4">
                    {sortedSubmissions
                      .filter(s => s.submissionStatus === 'Rejected')
                      .map((submission) => (
                        <div
                          key={submission.id}
                          onClick={() => setSelectedDraft(submission)}
                          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                          style={{ borderColor: '#e0e0e0' }}
                        >
                          <div className="grid grid-cols-2 gap-6 p-5">
                            {/* Left Column - Submission Info */}
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                                    {submission.code}
                                  </h3>
                                  <span
                                    className="inline-block px-2 py-1 rounded text-xs font-medium mt-1"
                                    style={{
                                      backgroundColor: submission.type === 'typecode' ? '#e3f2fd' : '#fff3e0',
                                      color: submission.type === 'typecode' ? '#1565c0' : '#e65100'
                                    }}
                                  >
                                    {submission.type === 'typecode' ? 'Type Code' : 'Voucher'}
                                  </span>
                                </div>
                                <span
                                  className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ 
                                    backgroundColor: '#d32f2f',
                                    color: '#ffffff'
                                  }}
                                >
                                  {submission.submissionStatus}
                                </span>
                              </div>

                              <p className="text-sm mb-3" style={{ color: '#333333' }}>
                                {submission.description}
                              </p>

                              <div className="text-xs space-y-1" style={{ color: '#666666' }}>
                                <div>Submitted by: {submission.modifiedBy}</div>
                                <div>Rejected by: {['Alice Johnson', 'Bob Brown', 'Jane Smith'][Math.floor(Math.random() * 3)]}</div>
                                <div>Rejected date: {submission.rejectedDate}</div>
                                <div>Business Area: {submission.businessArea}</div>
                              </div>
                            </div>

                            {/* Right Column - Notes */}
                            <div className="border-l pl-6" style={{ borderColor: '#e0e0e0' }}>
                              <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e3a5f' }}>
                                Submission Rejected with Notes
                              </h4>
                              <p className="text-sm" style={{ color: '#666666' }}>
                                {submission.rejectionNotes || 'No notes provided.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Approved Section */}
              {sortedSubmissions.filter(s => s.submissionStatus === 'Approved').length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#1e3a5f' }}>
                    Approved Submissions
                  </h2>
                  <div className="mb-4" style={{ borderBottom: '2px solid #1e3a5f' }}></div>
                  <div className="space-y-4">
                    {sortedSubmissions
                      .filter(s => s.submissionStatus === 'Approved')
                      .map((submission) => (
                        <div
                          key={submission.id}
                          onClick={() => setSelectedDraft(submission)}
                          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                          style={{ borderColor: '#e0e0e0' }}
                        >
                          <div className="grid grid-cols-2 gap-6 p-5">
                            {/* Left Column - Submission Info */}
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                                    {submission.code}
                                  </h3>
                                  <span
                                    className="inline-block px-2 py-1 rounded text-xs font-medium mt-1"
                                    style={{
                                      backgroundColor: submission.type === 'typecode' ? '#e3f2fd' : '#fff3e0',
                                      color: submission.type === 'typecode' ? '#1565c0' : '#e65100'
                                    }}
                                  >
                                    {submission.type === 'typecode' ? 'Type Code' : 'Voucher'}
                                  </span>
                                </div>
                                <span
                                  className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ 
                                    backgroundColor: '#7cb342',
                                    color: '#ffffff'
                                  }}
                                >
                                  {submission.submissionStatus}
                                </span>
                              </div>

                              <p className="text-sm mb-3" style={{ color: '#333333' }}>
                                {submission.description}
                              </p>

                              <div className="text-xs space-y-1" style={{ color: '#666666' }}>
                                <div>Submitted by: {submission.modifiedBy}</div>
                                <div>Approved by: {['Alice Johnson', 'Bob Brown', 'Jane Smith'][Math.floor(Math.random() * 3)]}</div>
                                <div>Approved date: {submission.approvedDate}</div>
                                <div>Business Area: {submission.businessArea}</div>
                              </div>
                            </div>

                            {/* Right Column - Notes */}
                            <div className="border-l pl-6" style={{ borderColor: '#e0e0e0' }}>
                              <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e3a5f' }}>
                                Submission Approved with Notes
                              </h4>
                              <p className="text-sm" style={{ color: '#666666' }}>
                                {submission.approvalNotes || 'No notes provided.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View All Content */}
        {activeTab === 'viewall' && (
          <div className="p-6">
            {/* Filter Options Module */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-x-12 gap-y-4 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                {/* Filter Status Section */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[#1e3a5f]">Status:</span>
                  <div className="flex gap-5">
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                        name="activeStatus"
                        value="all"
                        checked={filterActiveStatus === 'all'}
                        onChange={() => setFilterActiveStatus('all')}
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-[#1e3a5f] transition-colors">All</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                        name="activeStatus"
                        value="active"
                        checked={filterActiveStatus === 'active'}
                        onChange={() => setFilterActiveStatus('active')}
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-[#1e3a5f] transition-colors">Active Only</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                        name="activeStatus"
                        value="expired"
                        checked={filterActiveStatus === 'expired'}
                        onChange={() => setFilterActiveStatus('expired')}
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-[#1e3a5f] transition-colors">Expired Only</span>
                    </label>
                  </div>
                </div>

                {/* Vertical Separator */}
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                {/* Business Area Section */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-[#1e3a5f]">Business Area:</label>
                  <select
                    className="px-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] bg-gray-50"
                    value={filterBusinessArea}
                    onChange={(e) => setFilterBusinessArea(e.target.value)}
                  >
                    <option value="all">All Areas</option>
                    <option value="Casino">Casino</option>
                    <option value="Spa">Spa</option>
                    <option value="Photo">Photo</option>
                    <option value="Medical">Medical</option>
                    <option value="Hardings">Hardings</option>
                    <option value="Effy">Effy</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Shore Excursion">Shore Excursion</option>
                  </select>
                </div>

                {/* Vertical Separator */}
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                {/* Sort Section */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-[#1e3a5f]">Sort By:</label>
                  <select
                    className="px-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] bg-gray-50"
                    value={librarySortBy}
                    onChange={(e) => setLibrarySortBy(e.target.value as 'typecode' | 'voucherid')}
                  >
                    <option value="typecode">Type Code</option>
                    <option value="voucherid">Voucher ID</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e0' }}>
              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#1e3a5f' }}>
                      {librarySortBy === 'typecode' ? (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Type Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Type Code Long Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Voucher ID</th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Voucher ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Voucher Long Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Type Code</th>
                        </>
                      )}
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Business Area</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Financial Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Closing Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Balance = 0 at Close</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Last Updated</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Active?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {([
                      // Row 1 – TC + Voucher
                      { tc: 'S4',  tcDesc: 'Spa Services Premium',         tcShortDesc: 'Spa Prem',  catId: 'Hotel Charges (Sub-systems)', fin: 'AC', transType: 'Debit',  gratuity: '0',  shorexCat: '',          linkToVid: 'P53',  refundable: true,  factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: true,
                        vid: 'P53',  vidDesc: 'Spa Photo Package Voucher',   vidShortDesc: 'Spa Photo',  vidType: 'P', glCode: '5400-010', close: 'Soft',     bal0: true,  linkToTc: 'S4',  cat: 'Art Charges',               area: 'Spa',      updated: '2026-03-18 10:00', active: 'Yes' },
                      // Row 2 – TC + Voucher
                      { tc: '12',  tcDesc: 'Casino Gaming Credit',          tcShortDesc: 'Casino Cr', catId: 'Credits (OP)',                fin: 'OP', transType: 'Credit', gratuity: '0',  shorexCat: '',          linkToVid: 'R304', refundable: false, factorOBC: true,  showAcct: true,  showGuest: false, isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'R304', vidDesc: 'Casino Gaming Revenue Voucher',vidShortDesc: 'Casino Rev', vidType: 'R', glCode: '5200-042', close: 'Pre-Hard', bal0: false, linkToTc: '12',  cat: 'Credits (OP)',              area: 'Casino',   updated: '2026-03-17 14:30', active: 'Yes' },
                      // Row 3 – TC + Voucher
                      { tc: 'ST',  tcDesc: 'Shore Excursion Standard',      tcShortDesc: 'Shorex Std',catId: 'Shorex',                     fin: 'AP', transType: 'Debit',  gratuity: '0',  shorexCat: 'Standard',  linkToVid: 'P901', refundable: false, factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: true,  discountable: false,
                        vid: 'P901', vidDesc: 'Standard Shorex Payment Voucher',vidShortDesc: 'Std Shorex',vidType: 'P', glCode: '5600-100', close: 'Hard',     bal0: true,  linkToTc: 'ST',  cat: 'Shorex',                   area: 'Effy',     updated: '2026-03-16 09:15', active: 'No'  },
                      // Row 4 – TC + Voucher
                      { tc: 'SU',  tcDesc: 'Suite Service Upgrade',         tcShortDesc: 'Suite Up',  catId: 'Hotel Charges (Sub-systems)', fin: 'AC', transType: 'Debit',  gratuity: '0',  shorexCat: '',          linkToVid: 'R400', refundable: true,  factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: true,
                        vid: 'R400', vidDesc: 'Suite Upgrade Revenue Voucher', vidShortDesc: 'Suite Rev',  vidType: 'R', glCode: '5100-055', close: 'Soft',     bal0: true,  linkToTc: 'SU',  cat: 'Hotel Charges (Sub-systems)',area: 'Hotel',    updated: '2026-03-15 11:20', active: 'Yes' },
                      // Row 5 – TC + Voucher
                      { tc: 'CS',  tcDesc: 'Cash Onboard',                  tcShortDesc: 'Cash OB',   catId: 'Payments (AP)',               fin: 'AC', transType: 'Credit', gratuity: '0',  shorexCat: '',          linkToVid: 'P910', refundable: false, factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: true,  autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'P910', vidDesc: 'Cash Onboard Payment Voucher',  vidShortDesc: 'Cash Pay',   vidType: 'P', glCode: '5300-020', close: 'Soft',     bal0: true,  linkToTc: 'CS',  cat: 'Payments (AP)',             area: 'Casino',   updated: '2026-03-14 16:45', active: 'Yes' },
                      // Row 6 – Voucher only (no TC)
                      { tc: '',    tcDesc: '', tcShortDesc: '', catId: '', fin: '', transType: '', gratuity: '', shorexCat: '', linkToVid: '', refundable: false, factorOBC: false, showAcct: false, showGuest: false, isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'P101', vidDesc: 'Photo Package Credit Voucher',   vidShortDesc: 'Photo Cr',   vidType: 'P', glCode: '5400-031', close: 'Pre-Hard', bal0: true,  linkToTc: '',    cat: 'Credits (OP)',              area: 'Photo',    updated: '2026-03-13 13:00', active: 'Yes' },
                      // Row 7 – TC only (no Voucher)
                      { tc: 'S4',  tcDesc: 'Spa Services Premium Weekend',  tcShortDesc: 'Spa Wknd',  catId: 'Hotel Charges (Sub-systems)', fin: 'AC', transType: 'Debit',  gratuity: '0',  shorexCat: '',          linkToVid: '',     refundable: true,  factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: true,
                        vid: '',    vidDesc: '', vidShortDesc: '', vidType: '', glCode: '', close: 'Soft',     bal0: false, linkToTc: '',    cat: 'Hotel Charges (Sub-systems)',area: 'Spa',      updated: '2026-03-12 10:30', active: 'Yes' },
                      // Row 8 – TC + Voucher
                      { tc: '12',  tcDesc: 'Casino Table Game Credit',      tcShortDesc: 'Table Cr',  catId: 'Credits (OP)',                fin: 'OP', transType: 'Credit', gratuity: '0',  shorexCat: '',          linkToVid: 'R505', refundable: false, factorOBC: true,  showAcct: true,  showGuest: false, isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'R505', vidDesc: 'Table Games Revenue Voucher',   vidShortDesc: 'Table Rev',  vidType: 'R', glCode: '5200-078', close: 'Hard',     bal0: true,  linkToTc: '12',  cat: 'Credits (OP)',              area: 'Casino',   updated: '2026-03-11 15:00', active: 'Yes' },
                      // Row 9 – TC only (no Voucher)
                      { tc: 'ST',  tcDesc: 'Shore Excursion Deluxe Port',   tcShortDesc: 'Shorex Dlx',catId: 'Shorex',                     fin: 'AP', transType: 'Debit',  gratuity: '0',  shorexCat: 'Deluxe',    linkToVid: '',     refundable: false, factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: true,  discountable: false,
                        vid: '',    vidDesc: '', vidShortDesc: '', vidType: '', glCode: '', close: 'Soft',     bal0: false, linkToTc: '',    cat: 'Shorex',                   area: 'Hardings', updated: '2026-03-10 08:45', active: 'Yes' },
                      // Row 10 – Voucher only (no TC)
                      { tc: '',    tcDesc: '', tcShortDesc: '', catId: '', fin: '', transType: '', gratuity: '', shorexCat: '', linkToVid: '', refundable: false, factorOBC: false, showAcct: false, showGuest: false, isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'R606', vidDesc: 'Medical Services Revenue Voucher',vidShortDesc: 'Med Rev',   vidType: 'R', glCode: '5700-091', close: 'Hard',     bal0: false, linkToTc: '',    cat: 'Payments (AP)',             area: 'Medical',  updated: '2026-03-09 17:20', active: 'No'  },
                      // Row 11 – TC + Voucher
                      { tc: 'CS',  tcDesc: 'Cash Onboard Emergency',        tcShortDesc: 'Cash Em',   catId: 'Payments (AP)',               fin: 'AC', transType: 'Credit', gratuity: '0',  shorexCat: '',          linkToVid: 'P202', refundable: false, factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: true,  autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'P202', vidDesc: 'Emergency Cash Payment Voucher', vidShortDesc: 'Emrg Pay',   vidType: 'P', glCode: '5300-044', close: 'Soft',     bal0: true,  linkToTc: 'CS',  cat: 'Payments (AP)',             area: 'Casino',   updated: '2026-03-08 12:10', active: 'Yes' },
                      // Row 12 – TC only (no Voucher)
                      { tc: 'SU',  tcDesc: 'Suite Service VIP Upgrade',     tcShortDesc: 'Suite VIP', catId: 'Hotel Charges (Sub-systems)', fin: 'AC', transType: 'Debit',  gratuity: '0',  shorexCat: '',          linkToVid: '',     refundable: true,  factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: true,
                        vid: '',    vidDesc: '', vidShortDesc: '', vidType: '', glCode: '', close: 'Pre-Hard', bal0: false, linkToTc: '',    cat: 'Hotel Charges (Sub-systems)',area: 'Hotel',    updated: '2026-03-07 14:55', active: 'Yes' },
                      // Row 13 – Voucher only (no TC)
                      { tc: '',    tcDesc: '', tcShortDesc: '', catId: '', fin: '', transType: '', gratuity: '', shorexCat: '', linkToVid: '', refundable: false, factorOBC: false, showAcct: false, showGuest: false, isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: false,
                        vid: 'P303', vidDesc: 'Effy Art Charges Voucher',        vidShortDesc: 'Effy Art',   vidType: 'P', glCode: '5800-120', close: 'Soft',     bal0: true,  linkToTc: '',    cat: 'Art Charges',               area: 'Effy',     updated: '2026-03-06 11:30', active: 'Yes' },
                      // Row 14 – TC + Voucher
                      { tc: 'S4',  tcDesc: 'Spa Services Specialty',        tcShortDesc: 'Spa Spec',  catId: 'Hotel Charges (Sub-systems)', fin: 'AC', transType: 'Debit',  gratuity: '18', shorexCat: '',          linkToVid: 'R707', refundable: true,  factorOBC: false, showAcct: true,  showGuest: true,  isCreditCard: false, isTender: false, autoVoucher: false, isShorex: false, discountable: true,
                        vid: 'R707', vidDesc: 'Specialty Spa Revenue Voucher',   vidShortDesc: 'Spec Spa',   vidType: 'R', glCode: '5400-087', close: 'Hard',     bal0: false, linkToTc: 'S4',  cat: 'Hotel Charges (Sub-systems)',area: 'Spa',      updated: '2026-03-05 09:40', active: 'Yes' },
                      // Row 15 – TC only (no Voucher)
                      { tc: '12',  tcDesc: 'Casino Promotional Play',       tcShortDesc: 'Casino PR', catId: 'Credits (OP)',                fin: 'OP', transType: 'Credit', gratuity: '0',  shorexCat: '',          linkToVid: '',     refundable: false, factorOBC: true,  showAcct: true,  showGuest: false, isCreditCard: false, isTender: false, autoVoucher: true,  isShorex: false, discountable: false,
                        vid: '',    vidDesc: '', vidShortDesc: '', vidType: '', glCode: '', close: 'Soft',     bal0: false, linkToTc: '',    cat: 'Credits (OP)',              area: 'Casino',   updated: '2026-03-04 16:15', active: 'No'  },
                    ] as Array<{
                      tc: string; tcDesc: string; tcShortDesc: string; catId: string; fin: string;
                      transType: string; gratuity: string; shorexCat: string; linkToVid: string;
                      refundable: boolean; factorOBC: boolean; showAcct: boolean; showGuest: boolean;
                      isCreditCard: boolean; isTender: boolean; autoVoucher: boolean; isShorex: boolean; discountable: boolean;
                      vid: string; vidDesc: string; vidShortDesc: string; vidType: string;
                      glCode: string; close: string; bal0: boolean; linkToTc: string;
                      cat: string; area: string; updated: string; active: string;
                    }>).filter(row => {
                      // Status Filter
                      const matchesStatus = filterActiveStatus === 'all' || 
                        (filterActiveStatus === 'active' && row.active === 'Yes') || 
                        (filterActiveStatus === 'expired' && row.active === 'No');
                      
                      // Business Area Filter
                      const matchesArea = filterBusinessArea === 'all' || row.area === filterBusinessArea;
                      
                      return matchesStatus && matchesArea;
                    }).sort((a, b) => {
                      if (librarySortBy === 'typecode') {
                        if (!a.tc) return 1;
                        if (!b.tc) return -1;
                        return a.tc.localeCompare(b.tc);
                      } else {
                        if (!a.vid) return 1;
                        if (!b.vid) return -1;
                        return a.vid.localeCompare(b.vid);
                      }
                    }).map((row, index) => (
                      <tr
                        key={index}
                        onClick={() => setSelectedLibraryRow({
                          tc: row.tc, tcDesc: row.tcDesc, tcShortDesc: row.tcShortDesc,
                          catId: row.catId, fin: row.fin, transType: row.transType,
                          gratuity: row.gratuity, shorexCat: row.shorexCat, linkToVid: row.linkToVid,
                          refundable: row.refundable, factorOBC: row.factorOBC, showAcct: row.showAcct,
                          showGuest: row.showGuest, isCreditCard: row.isCreditCard, isTender: row.isTender,
                          autoVoucher: row.autoVoucher, isShorex: row.isShorex, discountable: row.discountable,
                          vid: row.vid, vidDesc: row.vidDesc, vidShortDesc: row.vidShortDesc,
                          vidType: row.vidType, glCode: row.glCode, close: row.close, bal0: row.bal0,
                          linkToTc: row.linkToTc, cat: row.cat, area: row.area,
                          updated: row.updated, active: row.active,
                        })}
                        className="cursor-pointer hover:bg-blue-50 transition-colors"
                        style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
                      >
                        {librarySortBy === 'typecode' ? (
                          <>
                            <td className="px-4 py-3 text-sm font-medium" style={{ color: '#1e3a5f' }}>{row.tc || <span className="text-gray-300">—</span>}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.tcDesc || <span className="text-gray-300">—</span>}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.vid || <span className="text-gray-300">—</span>}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3 text-sm font-medium" style={{ color: '#1e3a5f' }}>{row.vid || <span className="text-gray-300">—</span>}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.vidDesc || <span className="text-gray-300">—</span>}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.tc || <span className="text-gray-300">—</span>}</td>
                          </>
                        )}
                        <td className="px-4 py-3 text-sm text-gray-600">{row.area}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.fin}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.cat}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.close}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.bal0 ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{row.updated}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${row.active === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {row.active}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                className="px-10 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg"
                style={{ 
                  backgroundColor: '#1e3a5f',
                  fontSize: '16px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a4f7f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}
              >
                Export Current View
              </button>
              <button
                className="px-10 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg"
                style={{ 
                  backgroundColor: '#1e3a5f',
                  fontSize: '16px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a4f7f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}
              >
                Print Discount Report
              </button>
            </div>
          </div>
        )}

        {/* Library Row Detail Modal */}
        {selectedLibraryRow && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              onClick={() => setSelectedLibraryRow(null)}
            />
            <div
              className="bg-white rounded-lg shadow-xl w-full max-w-xl relative z-10"
              style={{ border: '1px solid #e0e0e0' }}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between p-5 border-b"
                style={{ borderColor: '#e0e0e0', backgroundColor: '#1e3a5f', borderRadius: '8px 8px 0 0' }}
              >
                <h2 className="text-lg font-semibold text-white">
                  {selectedLibraryRow.tc && selectedLibraryRow.vid
                    ? `Type Code ${selectedLibraryRow.tc} / Voucher ${selectedLibraryRow.vid}`
                    : selectedLibraryRow.tc
                    ? `Type Code: ${selectedLibraryRow.tc}`
                    : `Voucher: ${selectedLibraryRow.vid}`}
                </h2>
                <button
                  onClick={() => setSelectedLibraryRow(null)}
                  className="text-white hover:text-gray-200 transition-colors ml-4"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">

                {/* ── TYPE CODE MODULE ── */}
                <div className="rounded-lg border-2 border-[#1e3a5f] overflow-hidden">
                  <div className="px-4 py-2 bg-[#1e3a5f]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Type Code Setup</h3>
                  </div>
                  <div className="p-4 bg-blue-50">
                    {selectedLibraryRow.tc ? (
                      <div className="space-y-4">
                        {/* Row 1 */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Type Code (10 chars)</p>
                            <p className="text-[#1e3a5f] font-bold text-base">{selectedLibraryRow.tc}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Category ID</p>
                            <p className="text-gray-800">{selectedLibraryRow.catId || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Type Code Long Description (40 chars)</p>
                            <p className="text-gray-800">{selectedLibraryRow.tcDesc || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Financial Type</p>
                            <p className="text-gray-800">{selectedLibraryRow.fin || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Type Code Short Description (10 chars)</p>
                            <p className="text-gray-800">{selectedLibraryRow.tcShortDesc || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Transaction Type</p>
                            <p className="text-gray-800">{selectedLibraryRow.transType || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Gratuity % (0-100)</p>
                            <p className="text-gray-800">{selectedLibraryRow.gratuity !== '' ? `${selectedLibraryRow.gratuity}%` : '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Business Area</p>
                            <p className="text-gray-800">{selectedLibraryRow.area}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Shorex Sales Category</p>
                            <p className="text-gray-800">{selectedLibraryRow.shorexCat || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Link to Voucher ID</p>
                            <p className="text-gray-800">{selectedLibraryRow.linkToVid || '—'}</p>
                          </div>
                        </div>
                        {/* Checkboxes */}
                        <div className="border-t border-blue-200 pt-3">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Flags</p>
                          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-gray-700">
                            {[
                              ['Is Refundable?', selectedLibraryRow.refundable],
                              ["Factor in to 'Onboard Credits Used' on Folio memo?", selectedLibraryRow.factorOBC],
                              ['Show in Account Charges Screen?', selectedLibraryRow.showAcct],
                              ['Show in Guest Payments/Charges Screens?', selectedLibraryRow.showGuest],
                              ['Is Credit Card?', selectedLibraryRow.isCreditCard],
                              ['Is Tender Type?', selectedLibraryRow.isTender],
                              ['Auto Voucher?', selectedLibraryRow.autoVoucher],
                              ['Is Shorex Transaction?', selectedLibraryRow.isShorex],
                              ['Discountable?', selectedLibraryRow.discountable],
                            ].map(([label, val]) => (
                              <div key={label as string} className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${val ? 'bg-[#1e3a5f] border-[#1e3a5f]' : 'bg-white border-gray-300'}`}>
                                  {val ? '✓' : ''}
                                </span>
                                <span>{label as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No type code associated with this record.</p>
                    )}
                  </div>
                </div>

                {/* ── VOUCHER MODULE ── */}
                <div className="rounded-lg border-2 border-orange-400 overflow-hidden">
                  <div className="px-4 py-2 bg-orange-400">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Voucher Setup</h3>
                  </div>
                  <div className="p-4 bg-orange-50">
                    {selectedLibraryRow.vid ? (
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Voucher ID</p>
                          <p className="text-orange-600 font-bold text-base">{selectedLibraryRow.vid}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Voucher Type</p>
                          <p className="text-gray-800">{selectedLibraryRow.vidType || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Voucher Long Description (40 chars)</p>
                          <p className="text-gray-800">{selectedLibraryRow.vidDesc || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Voucher Short Description (20 chars)</p>
                          <p className="text-gray-800">{selectedLibraryRow.vidShortDesc || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Business Area</p>
                          <p className="text-gray-800">{selectedLibraryRow.area}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">GL Code</p>
                          <p className="text-gray-800">{selectedLibraryRow.glCode || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Closing Type</p>
                          <p className="text-gray-800">{selectedLibraryRow.close || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Balance must be ZERO at Close?</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${selectedLibraryRow.bal0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {selectedLibraryRow.bal0 ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Link to Type Code</p>
                          <p className="text-gray-800">{selectedLibraryRow.linkToTc || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Last Updated</p>
                          <p className="text-gray-800">{selectedLibraryRow.updated}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Active?</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${selectedLibraryRow.active === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedLibraryRow.active}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No voucher associated with this record.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 border-t" style={{ borderColor: '#e0e0e0' }}>
                <button
                  onClick={() => setSelectedLibraryRow(null)}
                  className="px-6 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#1e3a5f' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a4f7f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none">
            <div 
              className="px-12 py-6 rounded-lg shadow-xl"
              style={{ 
                backgroundColor: '#7cb342',
                animation: 'fadeOut 1s ease-in-out forwards'
              }}
            >
              <p className="text-white font-semibold text-2xl">
                {successMessageText}
              </p>
            </div>
          </div>
        )}
        
        {/* Draft Detail Modal */}
        {selectedDraft && !showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setSelectedDraft(null)}
            ></div>
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative z-10 max-h-[80vh] overflow-y-auto"
              style={{ border: '1px solid #e0e0e0' }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-6 border-b sticky top-0 bg-white"
                style={{ borderColor: '#e0e0e0' }}
              >
                <div className="flex-1 text-center">
                  <h2 className="text-2xl font-semibold" style={{ color: '#1e3a5f' }}>
                    {selectedDraft.type === 'typecode' ? 'Type Code' : 'Voucher'} <span className="font-bold">{selectedDraft.code}</span> Draft Details
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#666666' }}>
                    Last modified: {selectedDraft.lastModified}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDraft(null)}
                  className="text-gray-600 hover:text-gray-800 transition-colors absolute right-6 top-6"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {selectedDraft.type === 'voucher' ? (
                  // Voucher Details
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Voucher ID
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.code || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Voucher Type
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.voucherType || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Voucher Long Description (40 chars)
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.longDescription || selectedDraft.description || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Voucher Short Description (20 chars)
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.shortDescription || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          GL Code
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.glCode || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Closing Type
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.closingType || '—'}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                          Balance must be ZERO at Close?
                        </label>
                        <input 
                          type="checkbox" 
                          checked={selectedDraft.balanceZero || false}
                          readOnly
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                          Link to Type Code
                        </label>
                        <p className="font-medium" style={{ color: '#333333' }}>
                          {selectedDraft.linkToTypecode || '—'}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Type Code Details
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Type Code (10 chars)
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.code || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Category ID
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.categoryId || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Type Code Long Description (40 chars)
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.longDescription || selectedDraft.description || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Financial Type
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.financialType || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Type Code Short Description (10 chars)
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.shortDescription || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Transaction Type
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.transactionType || '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Gratuity % (0-100)
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.gratuityPercent !== undefined ? `${selectedDraft.gratuityPercent}%` : '—'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-center" style={{ color: '#666666' }}>
                          Shorex Sales Category
                        </label>
                        <p className="font-medium text-center" style={{ color: '#333333' }}>
                          {selectedDraft.shorexSalesCategory || '—'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Checkboxes Section */}
                    <div className="mt-6 pt-4 border-t" style={{ borderColor: '#e0e0e0' }}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Is refundable?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.isRefundable || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Factor in to 'Onboard Credits Used' on Folio memo?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.factorOnboardCredits || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Show in Account Charges Screen?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.showAccountCharges || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Show in Guest Payments/Charges Screens?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.showGuestPayments || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Is Credit Card?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.isCreditCard || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Is Tender Type?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.isTenderType || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Auto Voucher?
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.autoVoucher || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Is Shorex Transaction? (Optional)
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.isShorexTransaction || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-3" style={{ color: '#666666' }}>
                            Discountable (Optional)
                          </label>
                          <input 
                            type="checkbox" 
                            checked={selectedDraft.discountable || false}
                            readOnly
                            className="w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1" style={{ color: '#666666' }}>
                        Link to Voucher ID
                      </label>
                      <p className="font-medium" style={{ color: '#333333' }}>
                        {selectedDraft.linkToVoucherId || '—'}
                      </p>
                    </div>
                  </>
                )}
                
                {/* Approval History - Only show for submissions with status */}
                {selectedDraft.submissionStatus && (selectedDraft.submissionStatus === 'Approved' || selectedDraft.submissionStatus === 'Rejected') && (
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: '#e0e0e0' }}>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e3a5f' }}>
                      Approval History
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2" style={{ color: '#333333' }}>
                        <span className="font-medium">Draft submitted for approval at:</span>
                        <span>{selectedDraft.submittedDate}</span>
                      </div>
                      {selectedDraft.submissionStatus === 'Approved' && selectedDraft.approvedBy && (
                        <div className="flex items-center gap-2" style={{ color: '#333333' }}>
                          <span className="font-medium">Approved by:</span>
                          <span>{selectedDraft.approvedBy}</span>
                          <span>at {selectedDraft.approvedDate}</span>
                        </div>
                      )}
                      {selectedDraft.submissionStatus === 'Rejected' && selectedDraft.rejectedBy && (
                        <div className="flex items-center gap-2" style={{ color: '#333333' }}>
                          <span className="font-medium">Rejected by:</span>
                          <span>{selectedDraft.rejectedBy}</span>
                          <span>at {selectedDraft.rejectedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div 
                className="flex items-center justify-end gap-4 p-6 border-t sticky bottom-0 bg-white"
                style={{ borderColor: '#e0e0e0' }}
              >
                <button
                  onClick={() => {
                    setShowDeleteConfirm(true);
                  }}
                  className="px-6 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#d32f2f' }}
                >
                  Delete Draft
                </button>
                <button
                  onClick={() => {
                    // Navigate to edit page with draft data
                    navigate('/create-new-TV', { state: { editDraft: selectedDraft } });
                  }}
                  className="px-6 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#7cb342' }}
                >
                  Edit Draft
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && selectedDraft && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setShowDeleteConfirm(false)}
            ></div>
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10"
              style={{ border: '1px solid #e0e0e0' }}
            >
              {/* Header */}
              <div 
                className="p-6 border-b"
                style={{ borderColor: '#e0e0e0' }}
              >
                <h2 className="text-xl font-semibold" style={{ color: '#1e3a5f' }}>
                  Confirm Delete
                </h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <p style={{ color: '#333333' }}>
                  Are you sure you want to delete this draft? This action cannot be undone.
                </p>
              </div>

              {/* Footer */}
              <div 
                className="flex items-center justify-end gap-4 p-6 border-t"
                style={{ borderColor: '#e0e0e0' }}
              >
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 rounded font-medium"
                  style={{ backgroundColor: '#e0e0e0', color: '#333333' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedDraft(null);
                    setSuccessMessageText('Draft Successfully Deleted');
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 1000);
                  }}
                  className="px-6 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#d32f2f' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Manage Note Modal */}
        {showManageNote && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setShowManageNote(false)}
            ></div>
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative z-10"
              style={{ border: '1px solid #e0e0e0' }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: '#e0e0e0' }}
              >
                <h2 className="text-xl font-semibold" style={{ color: '#1e3a5f' }}>
                  Note
                </h2>
                <button
                  onClick={() => setShowManageNote(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p style={{ color: '#333333', lineHeight: '1.6' }}>
                  Do we even need this button? Can we just manage existing type codes and vouchers by having users create a "new" type code but with an already-existing name and we just record a new version of that type code?
                </p>
              </div>
            </div>
          </div>
        )}
        
        <style>
          {`
            @keyframes fadeOut {
              0% { opacity: 1; }
              60% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}
        </style>
      </main>

      {/* Move to Drafts Confirmation Dialog */}
      {showMoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3a5f' }}>
              Move Back to Drafts
            </h3>
            <p className="mb-6" style={{ color: '#333333' }}>
              Open As Draft?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => confirmMoveToDrafts(false)}
                className="flex-1 px-4 py-2 rounded font-medium transition-colors"
                style={{ 
                  backgroundColor: '#e0e0e0',
                  color: '#333333'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d0d0d0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
              >
                No
              </button>
              <button
                onClick={() => confirmMoveToDrafts(true)}
                className="flex-1 px-4 py-2 rounded font-medium text-white transition-colors"
                style={{ backgroundColor: '#7cb342' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#689f38'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7cb342'}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Submission Dialog */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e3a5f' }}>
              Reject Submission
            </h3>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter reason for rejection..."
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              rows={4}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setRejectionNote('');
                  setSubmissionToReject(null);
                  setShowRejectConfirm(false);
                }}
                className="flex-1 px-4 py-2 rounded font-medium transition-colors"
                style={{ backgroundColor: '#e0e0e0', color: '#333333' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRejectionNote('');
                  setSubmissionToReject(null);
                  setShowRejectConfirm(false);
                  setSuccessMessageText('Submission Rejected');
                  setShowSuccessMessage(true);
                  setTimeout(() => setShowSuccessMessage(false), 2000);
                }}
                className="flex-1 px-4 py-2 rounded font-medium text-white transition-colors"
                style={{ backgroundColor: '#d32f2f' }}
              >
                Confirm Rejected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg"
          style={{ 
            backgroundColor: '#7cb342',
            color: '#ffffff',
            animation: 'fadeOut 3s ease-in-out forwards'
          }}
        >
          <p className="font-medium">{successMessageText}</p>
        </div>
      )}

      <Footer />
    </div>
  );
}