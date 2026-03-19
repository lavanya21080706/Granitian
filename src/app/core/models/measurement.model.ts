export interface Measurement {

  measurement_id: number;

  granite_color: string;

  quality_type: string;

  total_slabs: number;

  total_net_sft: number;

  isEditable: boolean;

  isSharedByMe?: boolean;

  isSharedWithMe?: boolean;

  sharedWithUser?: string;

  sharedByUser?: string;

  created_at?: string;

}