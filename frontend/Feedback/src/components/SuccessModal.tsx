import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle, Star } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  ratings: {
    overall: number;
    knowledge: number;
    clarity: number;
    helpfulness: number;
    timeManagement: number;
  };
}

export function SuccessModal({ open, onClose, ratings }: SuccessModalProps) {
  const averageRating =
    (ratings.overall +
      ratings.knowledge +
      ratings.clarity +
      ratings.helpfulness +
      ratings.timeManagement) /
    5;

  return (
    <Dialog open={open} onChangeChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="bg-[#00A6ED] rounded-full p-3">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <DialogTitle className="text-2xl text-[#003DA5] text-center">
              Cảm ơn bạn đã đóng góp ý kiến!
            </DialogTitle>
            <p className="text-gray-600 text-center">
              Thank you for your feedback!
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-center text-gray-700 mb-3">Tóm tắt đánh giá của bạn</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 fill-[#00A6ED] text-[#00A6ED]" />
              <span className="text-2xl">{averageRating.toFixed(1)}/5.0</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Chất lượng tổng thể:</span>
                <span className="text-[#003DA5]">{ratings.overall}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kiến thức của Tutor:</span>
                <span className="text-[#003DA5]">{ratings.knowledge}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Độ rõ ràng:</span>
                <span className="text-[#003DA5]">{ratings.clarity}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sự hỗ trợ:</span>
                <span className="text-[#003DA5]">{ratings.helpfulness}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quản lý thời gian:</span>
                <span className="text-[#003DA5]">{ratings.timeManagement}/5</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={onClose}
              className="bg-[#003DA5] hover:bg-[#00A6ED] text-white w-full"
            >
              Xem phản hồi khác (View other feedback)
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-[#003DA5] text-[#003DA5]"
            >
              Về trang chủ (Back to home)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
