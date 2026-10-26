import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePakistaniPhone,
  formatPakistaniPhone,
  validateEnquiryInput,
  getClinicOpenStatus,
  filterReviews,
  generateEnquiryReference,
} from './clinicLogic';
import { VERIFIED_GOOGLE_REVIEWS } from '../data/clinicData';

test('validatePakistaniPhone accepts valid Pakistani mobile and Karachi landline formats', () => {
  assert.equal(validatePakistaniPhone('0333 3770353'), true);
  assert.equal(validatePakistaniPhone('+92 333 3770353'), true);
  assert.equal(validatePakistaniPhone('0300-1234567'), true);
  assert.equal(validatePakistaniPhone('021-35218975'), true);
  assert.equal(validatePakistaniPhone('12345'), false);
  assert.equal(validatePakistaniPhone(''), false);
});

test('formatPakistaniPhone normalizes standard Pakistani mobile numbers cleanly', () => {
  assert.equal(formatPakistaniPhone('+92 333 3770353'), '0333 3770353');
  assert.equal(formatPakistaniPhone('0333-3770353'), '0333 3770353');
});

test('validateEnquiryInput rejects empty fields and Sundays, and accepts valid enquiries', () => {
  const emptyResult = validateEnquiryInput({
    patientName: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: '3:00 PM – 4:30 PM',
    serviceInterest: '',
    contactMethod: 'Phone Call',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.patientName);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.preferredDate);
  assert.ok(emptyResult.errors.serviceInterest);

  // Sunday date: 2026-11-01 is a Sunday
  const sundayResult = validateEnquiryInput({
    patientName: 'Ayesha Khan',
    phone: '0333 3770353',
    preferredDate: '2026-11-01',
    preferredTimeSlot: '3:00 PM – 4:30 PM',
    serviceInterest: 'Orthodontics & Fixed Braces',
    contactMethod: 'Phone Call',
    message: 'Looking for fixed braces consultation.',
  });
  assert.equal(sundayResult.valid, false);
  assert.match(sundayResult.errors.preferredDate || '', /Sunday/);

  // Monday date: 2026-11-02 is a Monday
  const validResult = validateEnquiryInput({
    patientName: 'Ayesha Khan',
    phone: '+92 333 3770353',
    preferredDate: '2026-11-02',
    preferredTimeSlot: '3:00 PM – 4:30 PM',
    serviceInterest: 'Orthodontics & Fixed Braces',
    contactMethod: 'Phone Call',
    message: 'Looking for fixed braces consultation.',
  });
  assert.equal(validResult.valid, true);
});

test('getClinicOpenStatus identifies open vs closed windows in Karachi time (PKT UTC+5)', () => {
  // Monday 11:00 UTC = Monday 16:00 PKT (4:00 PM PKT -> Open)
  const mondayAfternoon = new Date('2026-10-26T11:00:00Z');
  const openStatus = getClinicOpenStatus(mondayAfternoon);
  assert.equal(openStatus.isOpenNow, true);
  assert.equal(openStatus.karachiDayName, 'Monday');

  // Sunday 11:00 UTC = Sunday 16:00 PKT (-> Closed)
  const sundayAfternoon = new Date('2026-10-25T11:00:00Z');
  const closedStatus = getClinicOpenStatus(sundayAfternoon);
  assert.equal(closedStatus.isOpenNow, false);
  assert.equal(closedStatus.karachiDayName, 'Sunday');
});

test('filterReviews filters genuine Google reviews accurately by theme and rating', () => {
  const allReviews = filterReviews(VERIFIED_GOOGLE_REVIEWS, 'All', 'all', '');
  assert.equal(allReviews.length, 5);

  const fiveStarOnly = filterReviews(VERIFIED_GOOGLE_REVIEWS, 'All', '5', '');
  assert.equal(fiveStarOnly.length, 4);

  const criticalOnly = filterReviews(VERIFIED_GOOGLE_REVIEWS, 'All', 'critical', '');
  assert.equal(criticalOnly.length, 1);
  assert.equal(criticalOnly[0].reviewerName, 'Talha D');

  const waitingTimeReviews = filterReviews(VERIFIED_GOOGLE_REVIEWS, 'Waiting Time & Scheduling', 'all', '');
  assert.equal(waitingTimeReviews.length, 2);
});

test('generateEnquiryReference produces deterministic reference code', () => {
  const ref = generateEnquiryReference(1761450000000, '0333 3770353');
  assert.equal(ref, 'HRS-50000-0353');
});
