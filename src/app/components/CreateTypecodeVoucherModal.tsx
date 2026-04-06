import { useState, Fragment } from 'react';
import { X } from 'lucide-react';
import exampleImage from 'figma:asset/603455abea8bc26e266fe05e2b96550c0bedd005.png';

interface CreateTypecodeVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShipDates {
  effective: string;
  expire: string;
}

export function CreateTypecodeVoucherModal({ isOpen, onClose }: CreateTypecodeVoucherModalProps) {
  const ships = [
    'Caribbean', 'Grand', 'Coral', 'Diamond', 'Emerald', 'Enchanted',
    'Island', 'Crown', 'Majestic', 'Royal', 'Ruby', 'Sapphire', 'Sky', 'Regal'
  ];

  const [showShipSelector, setShowShipSelector] = useState(false);
  const [shipSelectorType, setShipSelectorType] = useState<'voucher' | 'typecode'>('voucher');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');
  const [shipDates, setShipDates] = useState<Record<string, ShipDates>>(
    ships.reduce((acc, ship) => ({
      ...acc,
      [ship]: { effective: '', expire: '' }
    }), {})
  );
  
  if (!isOpen) return null;

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
    setSuccessMessageText('Draft Saved Successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSubmit = () => {
    setSuccessMessageText('Submission Successful!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] max-h-[95vh] overflow-y-auto"
          style={{ border: '1px solid #e0e0e0' }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b"
            style={{ backgroundColor: '#1e3a5f', borderColor: '#e0e0e0' }}
          >
            <h2 className="text-xl font-semibold text-white">
              Create New Type Code or Voucher
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Voucher ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Voucher Type
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Voucher Long Description (40 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Voucher Short Description (20 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#999999' }}>
                    GL Code
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f5f5f5', color: '#999999' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Closing Type
                  </label>
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
                  <label htmlFor="balance-zero" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                    Balance must be ZERO at Close?
                  </label>
                  <input
                    type="checkbox"
                    id="balance-zero"
                    className="w-5 h-5"
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Type Code (10 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Category ID
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Type Code Long Description (40 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Financial Type
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Type Code Short Description (10 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Transaction Type
                  </label>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Gratuity % (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border rounded"
                    style={{ borderColor: '#cccccc' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#999999' }}>
                    Shorex Sales Category
                  </label>
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
                    <label htmlFor="refundable" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Is refundable?
                    </label>
                    <input type="checkbox" id="refundable" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="onboard-credits" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Factor in to 'Onboard Credits Used' on Folio memo?
                    </label>
                    <input type="checkbox" id="onboard-credits" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="account-charges" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Show in Account Charges Screen?
                    </label>
                    <input type="checkbox" id="account-charges" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="guest-payments" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Show in Guest Payments/Charges Screens?
                    </label>
                    <input type="checkbox" id="guest-payments" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="credit-card" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Is Credit Card?
                    </label>
                    <input type="checkbox" id="credit-card" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="tender-type" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Is Tender Type?
                    </label>
                    <input type="checkbox" id="tender-type" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="auto-voucher" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Auto Voucher?
                    </label>
                    <input type="checkbox" id="auto-voucher" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="shorex-transaction" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Is Shorex Transaction? (Optional)
                    </label>
                    <input type="checkbox" id="shorex-transaction" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="discountable" className="text-sm font-medium mr-3" style={{ color: '#333333' }}>
                      Discountable (Optional)
                    </label>
                    <input type="checkbox" id="discountable" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="flex items-center justify-end gap-4 p-6 border-t"
            style={{ borderColor: '#e0e0e0' }}
          >
            <button
              onClick={onClose}
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
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
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

      {/* Success Message */}
      {showSuccessMessage && (
        <div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[70] px-8 py-4 rounded-lg shadow-xl animate-fade-out"
          style={{ 
            backgroundColor: '#7cb342',
            animation: 'fadeOut 3s ease-in-out forwards'
          }}
        >
          <p className="text-white font-semibold text-lg">
            {successMessageText}
          </p>
        </div>
      )}
      
      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </>
  );
}