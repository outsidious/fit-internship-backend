import { CalendarEventType } from 'src/shared/types/calendar-event.type';

const makeDuration = (event: CalendarEventType) => {
  const minutes = Math.floor(
    (+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000,
  );
  return `${Math.floor(minutes / 60)}:${`0${minutes % 60}`.slice(-2)}`;
};

const makeTime = (time: string) =>
  new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, '');

type Query = { [key: string]: null | boolean | number | string };

const makeUrl = (base: string, query: Query) =>
  Object.keys(query).reduce((accum, key, index) => {
    const value = query[key];

    if (value !== null) {
      return `${accum}${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(
        value,
      )}`;
    }
    return accum;
  }, base);

const makeGoogleCalendarUrl = (event: CalendarEventType) =>
  makeUrl('https://calendar.google.com/calendar/render', {
    action: 'TEMPLATE',
    dates: `${makeTime(event.startsAt)}/${makeTime(event.endsAt)}`,
    location: event.location,
    text: event.name,
    details: event.details,
  });

const makeOutlookCalendarUrl = (event: CalendarEventType) =>
  makeUrl('https://outlook.live.com/owa', {
    rru: 'addevent',
    startdt: makeTime(event.startsAt),
    enddt: makeTime(event.endsAt),
    subject: event.name,
    location: event.location,
    body: event.details,
    allday: false,
    uid: new Date().getTime().toString(),
    path: '/calendar/view/Month',
  });

const makeYahooCalendarUrl = (event: CalendarEventType) =>
  makeUrl('https://calendar.yahoo.com', {
    v: 60,
    view: 'd',
    type: 20,
    title: event.name,
    st: makeTime(event.startsAt),
    dur: makeDuration(event),
    desc: event.details,
    in_loc: event.location,
  });

const makeICSCalendarUrl = (event: CalendarEventType) => {
  const components = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    `DTSTART:${makeTime(event.startsAt)}`,
    `DTEND:${makeTime(event.endsAt)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${event.details}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return encodeURI(`data:text/calendar;charset=utf8,${components.join('\n')}`);
};

export const makeUrls = {
  google: (event) => makeGoogleCalendarUrl(event),
  outlook: (event) => makeOutlookCalendarUrl(event),
  yahoo: (event) => makeYahooCalendarUrl(event),
  ics: (event) => makeICSCalendarUrl(event),
};
