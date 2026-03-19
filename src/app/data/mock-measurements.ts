import { Measurement } from '../core/models/measurement.model';

export const MOCK_MEASUREMENTS: Measurement[] = [

{
measurement_id: 101,
granite_color: 'Black Galaxy',
quality_type: 'Premium',
total_slabs: 3,
total_net_sft: 220.45,
isEditable: true,
created_at: '2024-01-01'
},

{
measurement_id: 102,
granite_color: 'White Pearl',
quality_type: 'Standard',
total_slabs: 2,
total_net_sft: 180.20,
isEditable: false,
isSharedByMe: true,
sharedWithUser: 'Ramesh'
},

{
measurement_id: 103,
granite_color: 'Red Ruby',
quality_type: 'Premium',
total_slabs: 5,
total_net_sft: 300.10,
isEditable: false,
isSharedWithMe: true,
sharedByUser: 'Anil'
}

];