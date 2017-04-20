import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private options: any;
  private localeLabel: string;
  private localeSet: any;
  private loader: boolean;

  constructor(private tts: TextToSpeech,
              private alertCtrl: AlertController,
              public navCtrl: NavController) {
    this.options = {
      text: '',
      locale: 'en-US'
    };

    this.localeSet = [
      {
        type: 'radio',
        label: 'English',
        value: 'en-US',
        checked: false
      },
      {
        type: 'radio',
        label: 'Українська',
        value: 'uk-UA',
        checked: false
      },
      {
        type: 'radio',
        label: 'Русский',
        value: 'ru-RU',
        checked: false
      }
    ];

    this.localeLabel = 'English';
    this.loader = false;
  }

  chooseLocale() {
    let localeAlert = this.alertCtrl.create();

    localeAlert.setTitle('Text language');

    this.localeSet
      .forEach(locale => {
        locale.checked = this.options.locale === locale.value;
        localeAlert.addInput(locale);
      });

    localeAlert.addButton('Cancel');
    localeAlert.addButton({
      text: 'OK',
      handler: locale => {
        this.options.locale = locale;

        this.localeLabel = this.localeSet
          .find(localeFromSet => {
            return localeFromSet.value === locale;
          })
          .label;
      }
    });

    localeAlert.present();
  }

  sayText(text: string) {
    this.loader = true;
    this.options.text = text;

    this.tts.speak(this.options)
      .then(() => {
        this.loader = false;
      })
      .catch((err: any) => {
        this.loader = false;
        alert(err);
      });
  }
}
