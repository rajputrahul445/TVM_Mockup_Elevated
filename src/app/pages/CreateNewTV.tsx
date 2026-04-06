import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router';
import { X, HelpCircle } from 'lucide-react';
import { Header } from '../components/Header';

interface ShipDates {
  effective: string;
  expire: string;
}

interface DraftItem {
  id: string;
  code: string;
  type: 'typecode' | 'voucher';
  description: string;
  lastModified: string;
  modifiedBy: string;
  businessArea: string;
}

// Mock drafts data - same as in TypecodeVoucherManagement
const mockDrafts: DraftItem[] = [
  {
    id: '1',
    code: 'CS',
    type: 'typecode',
    description: 'Casino Services',
    lastModified: '2026-03-17 14:32',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Casino'
  },
  {
    id: '2',
    code: 'SL',
    type: 'typecode',
    description: 'Shore Excursion - Land',
    lastModified: '2026-03-16 10:15',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Shore Excursion'
  },
  {
    id: '3',
    code: 'S4',
    type: 'typecode',
    description: 'Spa Services Premium',
    lastModified: '2026-03-15 16:45',
    modifiedBy: 'JSmith',
    businessArea: 'Spa'
  },
  {
    id: '4',
    code: 'P345',
    type: 'voucher',
    description: 'Photo Package Voucher',
    lastModified: '2026-03-14 09:22',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Photo'
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
    businessArea: 'Medical'
  },
  {
    id: '7',
    code: 'PT',
    type: 'typecode',
    description: 'Photo Services - Traditional',
    lastModified: '2026-03-11 13:20',
    modifiedBy: 'JSmith',
    businessArea: 'Photo'
  },
  {
    id: '8',
    code: 'HD',
    type: 'typecode',
    description: 'Hardings Fine Jewelry',
    lastModified: '2026-03-10 08:45',
    modifiedBy: 'AJohnson',
    businessArea: 'Hardings'
  },
  {
    id: '9',
    code: 'MD',
    type: 'typecode',
    description: 'Medical Services - Consultation',
    lastModified: '2026-03-09 16:30',
    modifiedBy: 'MaqGarcia',
    businessArea: 'Medical'
  },
  {
    id: '10',
    code: 'SE',
    type: 'typecode',
    description: 'Shore Excursion - Extended',
    lastModified: '2026-03-08 12:15',
    modifiedBy: 'JSmith',
    businessArea: 'Shore Excursion'
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
    businessArea: 'Spa'
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

// Reusable label component with help icon
function FieldLabel({ children, htmlFor, disabled = false }: { children: React.ReactNode; htmlFor?: string; disabled?: boolean }) {
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <>
      <label 
        htmlFor={htmlFor} 
        className="flex items-center gap-2 text-sm font-medium mb-2" 
        style={{ color: disabled ? '#999999' : '#333333' }}
      >
        {children}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowHelp(true);
          }}
          className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ color: '#1e3a5f' }}
        >
          <HelpCircle size={14} />
        </button>
      </label>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowHelp(false)}
          ></div>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10"
            style={{ border: '1px solid #e0e0e0' }}
          >
            <div className="p-6">
              <p style={{ color: '#333333', marginBottom: '1.5rem' }}>
                Notes TBD... some day!
              </p>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full px-6 py-2 rounded font-medium text-white"
                style={{ backgroundColor: '#7cb342' }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CreateNewTV() {
  const navigate = useNavigate();
  const ships = [
    'Caribbean', 'Grand', 'Coral', 'Diamond', 'Emerald', 'Enchanted',
    'Island', 'Crown', 'Majestic', 'Royal', 'Ruby', 'Sapphire', 'Sky', 'Regal'
  ];

  const [showShipSelector, setShowShipSelector] = useState(false);
  const [shipSelectorType, setShipSelectorType] = useState<'voucher' | 'typecode'>('voucher');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');
  const [typecodeValue, setTypecodeValue] = useState('');
  const [voucherValue, setVoucherValue] = useState('');
  const [showDraftNotice, setShowDraftNotice] = useState(false);
  const [detectedDraft, setDetectedDraft] = useState<DraftItem | null>(null);
  const [shipDates, setShipDates] = useState<Record<string, ShipDates>>(
    ships.reduce((acc, ship) => ({
      ...acc,
      [ship]: { effective: '', expire: '' }
    }), {})
  );

  const handleTypecodeChange = (value: string) => {
    setTypecodeValue(value);
    
    // Check if this typecode exists in drafts
    const matchingDraft = mockDrafts.find(
      draft => draft.type === 'typecode' && draft.code.toUpperCase() === value.toUpperCase()
    );
    
    if (matchingDraft && value.length > 0) {
      setDetectedDraft(matchingDraft);
      setShowDraftNotice(true);
    }
  };

  const handleVoucherChange = (value: string) => {
    setVoucherValue(value);
    
    // Check if this voucher exists in drafts
    const matchingDraft = mockDrafts.find(
      draft => draft.type === 'voucher' && draft.code.toUpperCase() === value.toUpperCase()
    );
    
    if (matchingDraft && value.length > 0) {
      setDetectedDraft(matchingDraft);
      setShowDraftNotice(true);
    }
  };

  const handleGoToDraft = () => {
    if (detectedDraft) {
      localStorage.setItem('openDraftId', detectedDraft.id);
      navigate('/typecode-voucher-management');
    }
  };

  const handleContinueWithNew = () => {
    setShowDraftNotice(false);
    setDetectedDraft(null);
  };

  const handleShipDateChange = (ship: string, field: 'effective' | 'expire', value: string) => {
    setShipDates(prev => ({
      ...prev,
      [ship]: {
        ...prev[ship],
        [field]: value
      }
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('successMessage', 'Draft Saved Successfully!');
    navigate('/typecode-voucher-management');
  };

  const handleSubmit = () => {
    localStorage.setItem('successMessage', 'Submission Successful!');
    navigate('/typecode-voucher-management');
  };

  const handleCancel = () => {
    navigate('/typecode-voucher-management');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Header showMenu showUserProfile />

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: '#e0e0e0' }}>
            <h2 className="text-2xl font-semibold" style={{ color: '#1e3a5f' }}>
              Create New Type Code or Voucher
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* VOUCHER SETUP */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: '#1e3a5f' }}>
                  VOUCHER SETUP
                </h3>
                <button
                  onClick={() => { setShowShipSelector(true); setShipSelectorType('voucher'); }}
                  className="px-4 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#7cb342' }}
                >
                  Select ship(s) for this voucher and specify effective/end dates
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FieldLabel>Voucher ID</FieldLabel>
                  <input
                    type="text"
                    value={voucherValue}
                    onChange={(e) => handleVoucherChange(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Voucher Type</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="P">P</option>
                    <option value="R">R</option>
                    <option value="X">X</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Voucher Long Description (40 chars)</FieldLabel>
                  <input
                    type="text"
                    maxLength={40}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Voucher Short Description (20 chars)</FieldLabel>
                  <input
                    type="text"
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Business Area</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="Casino">Casino</option>
                    <option value="Spa">Spa</option>
                    <option value="Hardings">Hardings</option>
                    <option value="Photo">Photo</option>
                    <option value="Medical">Medical</option>
                  </select>
                </div>

                <div>
                  <FieldLabel disabled>GL Code</FieldLabel>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f5f5f5', color: '#999999' }}
                  />
                </div>

                <div>
                  <FieldLabel>Closing Type</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="Hard">Hard</option>
                    <option value="Pre-Hard">Pre-Hard</option>
                    <option value="Soft">Soft</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <FieldLabel htmlFor="balance-zero">Balance must be ZERO at Close?</FieldLabel>
                  <input
                    type="checkbox"
                    id="balance-zero"
                    className="w-5 h-5"
                  />
                </div>

                <div className="col-span-2 flex flex-col items-center">
                  <FieldLabel>Link to Type Code</FieldLabel>
                  <input
                    type="text"
                    className="w-1/2 px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                    placeholder="Enter type code"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-4" style={{ borderColor: '#1e3a5f' }}></div>

            {/* TYPE CODE SETUP */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: '#1e3a5f' }}>
                  TYPE CODE SETUP
                </h3>
                <button
                  onClick={() => { setShowShipSelector(true); setShipSelectorType('typecode'); }}
                  className="px-4 py-2 rounded font-medium text-white"
                  style={{ backgroundColor: '#7cb342' }}
                >
                  Select ship(s) for this type code and specify effective/end dates
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FieldLabel>Type Code (10 chars)</FieldLabel>
                  <input
                    type="text"
                    value={typecodeValue}
                    onChange={(e) => handleTypecodeChange(e.target.value)}
                    maxLength={10}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Category ID</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="Art Charges">Art Charges</option>
                    <option value="Hotel Charges (Sub-systems)">Hotel Charges (Sub-systems)</option>
                    <option value="POS Charges">POS Charges</option>
                    <option value="Misc Charges (Work Stations)">Misc Charges (Work Stations)</option>
                    <option value="Credits (OP)">Credits (OP)</option>
                    <option value="Payments (AP)">Payments (AP)</option>
                    <option value="Shorex">Shorex</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Type Code Long Description (40 chars)</FieldLabel>
                  <input
                    type="text"
                    maxLength={40}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Financial Type</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="AC">AC</option>
                    <option value="AP">AP</option>
                    <option value="OP">OP</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Type Code Short Description (10 chars)</FieldLabel>
                  <input
                    type="text"
                    maxLength={10}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Transaction Type</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Gratuity % (0-100)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <FieldLabel>Business Area</FieldLabel>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  >
                    <option value="">Select...</option>
                    <option value="Casino">Casino</option>
                    <option value="Spa">Spa</option>
                    <option value="Hardings">Hardings</option>
                    <option value="Photo">Photo</option>
                    <option value="Medical">Medical</option>
                  </select>
                </div>

                <div>
                  <FieldLabel disabled>Shorex Sales Category</FieldLabel>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f5f5f5', color: '#999999' }}
                  />
                </div>

                {/* Checkboxes */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FieldLabel htmlFor="refundable">Is refundable?</FieldLabel>
                    <input type="checkbox" id="refundable" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="onboard-credits">Factor in to 'Onboard Credits Used' on Folio memo?</FieldLabel>
                    <input type="checkbox" id="onboard-credits" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="account-charges">Show in Account Charges Screen?</FieldLabel>
                    <input type="checkbox" id="account-charges" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="guest-payments">Show in Guest Payments/Charges Screens?</FieldLabel>
                    <input type="checkbox" id="guest-payments" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="credit-card">Is Credit Card?</FieldLabel>
                    <input type="checkbox" id="credit-card" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="tender-type">Is Tender Type?</FieldLabel>
                    <input type="checkbox" id="tender-type" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="auto-voucher">Auto Voucher?</FieldLabel>
                    <input type="checkbox" id="auto-voucher" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="shorex-transaction">Is Shorex Transaction? (Optional)</FieldLabel>
                    <input type="checkbox" id="shorex-transaction" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <FieldLabel htmlFor="discountable">Discountable (Optional)</FieldLabel>
                    <input type="checkbox" id="discountable" className="w-5 h-5" />
                  </div>
                </div>

                <div className="col-span-2 flex flex-col items-center">
                  <FieldLabel>Link to Voucher ID</FieldLabel>
                  <input
                    type="text"
                    className="w-1/2 px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                    placeholder="Enter voucher ID"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#e0e0e0' }}>
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded font-medium"
              style={{ backgroundColor: '#e0e0e0', color: '#333333' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 rounded font-medium text-white"
              style={{ backgroundColor: '#7cb342' }}
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded font-medium text-white"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Ship Selector Modal */}
      {showShipSelector && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowShipSelector(false)}
          ></div>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative z-10"
            style={{ border: '1px solid #e0e0e0' }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ backgroundColor: '#1e3a5f', borderColor: '#e0e0e0' }}
            >
              <h3 className="text-lg font-semibold text-white">
                {shipSelectorType === 'voucher' 
                  ? 'Settings: Ship/Property for Voucher Setup' 
                  : 'Settings: Ship/Property for Type Code Setup'}
              </h3>
              <button
                onClick={() => setShowShipSelector(false)}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                {/* Header Row */}
                <div className="font-semibold" style={{ color: '#333333' }}>Ship</div>
                <div className="font-semibold" style={{ color: '#333333' }}>Effective</div>
                <div className="font-semibold" style={{ color: '#333333' }}>Expire</div>

                {/* Ship Rows */}
                {ships.map((ship) => (
                  <Fragment key={ship}>
                    <div className="text-sm" style={{ color: '#333333' }}>
                      {ship}
                    </div>
                    <input
                      type="date"
                      value={shipDates[ship].effective}
                      onChange={(e) => handleShipDateChange(ship, 'effective', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      style={{ borderColor: '#cccccc', backgroundColor: '#f5f5f5' }}
                    />
                    <input
                      type="date"
                      value={shipDates[ship].expire}
                      onChange={(e) => handleShipDateChange(ship, 'expire', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      style={{ borderColor: '#cccccc', backgroundColor: '#f5f5f5' }}
                    />
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div 
              className="flex items-center justify-end gap-4 p-4 border-t"
              style={{ borderColor: '#e0e0e0' }}
            >
              <button
                onClick={() => setShowShipSelector(false)}
                className="px-6 py-2 rounded font-medium"
                style={{ backgroundColor: '#e0e0e0', color: '#333333' }}
              >
                Close
              </button>
              <button
                onClick={() => setShowShipSelector(false)}
                className="px-6 py-2 rounded font-medium text-white"
                style={{ backgroundColor: '#7cb342' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Draft Notice Modal */}
      {showDraftNotice && detectedDraft && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
                Draft Already Exists
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p style={{ color: '#333333' }}>
                We noticed you already have a draft saved for this {detectedDraft.type === 'typecode' ? 'type code' : 'voucher'}. Do you want to check it out?
              </p>
            </div>

            {/* Footer */}
            <div 
              className="flex items-center justify-end gap-4 p-6 border-t"
              style={{ borderColor: '#e0e0e0' }}
            >
              <button
                onClick={handleContinueWithNew}
                className="px-6 py-2 rounded font-medium"
                style={{ backgroundColor: '#e0e0e0', color: '#333333' }}
              >
                No, I'm starting a new draft for this {detectedDraft.type === 'typecode' ? 'type code' : 'voucher'}
              </button>
              <button
                onClick={handleGoToDraft}
                className="px-6 py-2 rounded font-medium text-white"
                style={{ backgroundColor: '#7cb342' }}
              >
                Yes, take me to the most recent draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
