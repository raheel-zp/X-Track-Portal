const ADMIN = {
    DASHBOARD: true,
    NOTIFICATION: false,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: true,
    DASHBOARD_SO: true,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: true,
    DASHBOARD_EAN_PATIENT: true,
    //
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: true,
    //
    FORM_PATIENT: true,
    PATIENT_DELETE: true,
    FORM_PATIENT_MEDICATION: true,
    FORM_STOCK: true,
    FORM_USER: true,
    //
    CONTACT_US: false,
    CONTACT_LIST: true,
}
const DOPASI = {
    DASHBOARD: true,
    NOTIFICATION: false,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: true,
    DASHBOARD_SO: true,
    DASHBOARD_FOUR: false,

    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: true,
    DASHBOARD_EAN_PATIENT: true,
    //
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: true,
    //
    FORM_PATIENT_MEDICATION: false,
    PATIENT_DELETE: false,
    FORM_PATIENT: true,
    FORM_STOCK: true,
    FORM_USER: false,
    //
    CONTACT_US: true,
    CONTACT_LIST: true,
}
const PTP = {
    DASHBOARD: true,
    NOTIFICATION: false,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: true,
    DASHBOARD_FOUR: false,

    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: true,
    //
    FORM_PATIENT_MEDICATION: false,
    PATIENT_DELETE: false,
    FORM_PATIENT: false,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: true,
    CONTACT_LIST: false,
}
const DC = {
    DASHBOARD: true,
    NOTIFICATION: true,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: false,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: false,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: false,
    //
    FORM_PATIENT_MEDICATION: false,
    PATIENT_DELETE: false,
    FORM_PATIENT: true,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: true,
    CONTACT_LIST: false,
}
const DTC = {
    DASHBOARD: true,
    NOTIFICATION: true,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: false,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: false,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: false,
    //
    FORM_PATIENT_MEDICATION: false,
    PATIENT_DELETE: false,
    FORM_PATIENT: true,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: true,
    CONTACT_LIST: false,
}
const DI = {
    DASHBOARD: true,
    NOTIFICATION: false,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: false,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: false,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: true,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    REPORT_PHARMACIES: false,
    REPORT_PATIENTS: false,
    REPORT_STOCK: true,
    //
    FORM_PATIENT_MEDICATION: false,
    PATIENT_DELETE: false,
    FORM_PATIENT: false,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: true,
    CONTACT_LIST: false,

}
const CC = {
    DASHBOARD: true,
    NOTIFICATION: true,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: false,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: false,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    FORM_PATIENT_MEDICATION: true,
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: true,
    //
    FORM_PATIENT: true,
    PATIENT_DELETE: false,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: false,
    CONTACT_LIST: true,
}


const SR = {
    DASHBOARD: true,
    NOTIFICATION: true,
    DASHBOARD_PATIENT_REGISTERED: true,
    DASHBOARD_PATIENT_NOTIFIED: true,
    DASHBOARD_PHARMACIES: true,
    DASHBOARD_TREATMENT_OUTCOME: false,
    DASHBOARD_SO: false,
    DASHBOARD_FOUR: false,
    DASHBOARD_EA_PHARMACIES: false,
    DASHBOARD_EAR_PATIENT: false,
    DASHBOARD_EAN_PATIENT: false,
    //
    FORM_PATIENT_MEDICATION: true,
    REPORT_PHARMACIES: true,
    REPORT_PATIENTS: true,
    REPORT_STOCK: true,
    //
    FORM_PATIENT: true,
    PATIENT_DELETE: false,
    FORM_STOCK: false,
    FORM_USER: false,
    //
    CONTACT_US: false,
    CONTACT_LIST: true,
}

module.exports = {
    ADMIN,
    DOPASI,
    PTP,
    DC,
    DTC,
    DI,
    CC,
    SR
}