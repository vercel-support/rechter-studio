const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

export const toCapitalizedWords = name => {
  var words = name.match(/[A-Za-z][a-z]*/g) || [];

  return words.map(capitalize).join(' ');
};

export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const validatePhone = phone => {
  return phone.replace(/\D/g, '').length >= 9;
};

export const validateLink = str => {
  const pattern = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi); // fragment locator
  return !!pattern.test(str);
};

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const youtubeEmbedTransformer = urlStr => {
  return urlStr ? `https://www.youtube-nocookie.com/embed/${urlStr.replace(/\s/g, '').split('/').pop().split('v=').pop()}` : '';
};

export const exportToCsv = (filename, rows) => {
  let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function scrollToContact() {
  if (document.getElementById('contactSection')) {
    document.getElementById('contactSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    // setTimeout(() => {
    //   document.getElementById('contact-form-name').focus();
    // }, 1000);
  }
}

// export function scrollToSummary() {
//   if (document.getElementById('contactSection')) {
//     document.getElementById('contactSection').scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//     setTimeout(() => {
//       document.getElementById('contact-form-name').focus();
//     }, 1000);
//   }
// }

export default {
  toCapitalizedWords,
  validateEmail,
  validatePhone,
  toTitleCase,
  youtubeEmbedTransformer,
  exportToCsv,
  validateLink,
  camelize,
  scrollToContact,
  // scrollToSummary,
};
