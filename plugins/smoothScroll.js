const smoothScroll = id => {
  history.pushState({}, '', "#/" + id)

  if(id == "")
    id = "top"

  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  })
}

export default (context, inject) => {
  inject('smoothScroll', smoothScroll)
  context.$smoothScroll = smoothScroll
}
