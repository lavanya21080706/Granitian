import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonIcon,
  IonInput,
  IonModal,
  IonList,
  IonItem,
  IonContent,
} from '@ionic/angular/standalone';

import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  CountryCode
} from 'libphonenumber-js';

import * as isoCountries from 'i18n-iso-countries';
import * as enLocale from 'i18n-iso-countries/langs/en.json';

isoCountries.registerLocale(enLocale);

interface Country {
  name: string;
  code: CountryCode;
  dialCode: string;
  flag: string;
}

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    IonInput,
    IonModal,
    IonList,
    IonItem,
    IonContent,
  ],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {

  @Input() label: string = 'Mobile Number';
  @Output() phoneChange = new EventEmitter<string>();
  @Output() validityChange = new EventEmitter<boolean>();

  phoneNumber: string = '';
  searchText: string = '';
  showModal: boolean = false;

  countries: Country[] = [];
  selectedCountry!: Country;

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
  const countryCodes = getCountries();

  this.countries = countryCodes
    .filter(code => isoCountries.getName(code, 'en')) 
    .map((code) => {
      const dialCode = '+' + getCountryCallingCode(code);
      const countryName = isoCountries.getName(code, 'en')!;

      return {
        name: countryName,
        code: code,
        dialCode: dialCode,
        flag: this.getFlagEmoji(code)
      };
    });

  const defaultCountry = this.countries.find(c => c.code === 'IN');
  this.selectedCountry = defaultCountry || this.countries[0];
}

  trackByCountry(index: number, country: Country) {
  return country.code;
}

getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) {
    return '🌍'; 
  }

  const code = countryCode.toUpperCase();

  return String.fromCodePoint(
    code.charCodeAt(0) + 127397,
    code.charCodeAt(1) + 127397
  );
}

  get filteredCountries(): Country[] {
    if (!this.searchText) return this.countries;

    return this.countries.filter(country =>
      country.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      country.dialCode.includes(this.searchText)
    );
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.showModal = false;
    this.validate();
  }

  onPhoneInput(event: any) {
    const value = event.target.value || '';
    this.phoneNumber = value.replace(/[^0-9]/g, '');
    this.validate();
  }

  validate() {
    if (!this.phoneNumber) {
      this.validityChange.emit(false);
      return;
    }

    const fullNumber = `${this.selectedCountry.dialCode}${this.phoneNumber}`;

    const phone = parsePhoneNumberFromString(fullNumber);

    if (phone && phone.isValid()) {
      this.phoneChange.emit(phone.format('E.164'));
      this.validityChange.emit(true);
    } else {
      this.validityChange.emit(false);
    }
  }
}
