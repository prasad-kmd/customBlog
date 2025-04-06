module ReadingTimeFilter
    def reading_time(input)
      words_per_minute = 200
      words = input.split.size
      minutes = (words / words_per_minute).floor
      minutes_label = minutes == 1 ? "min" : "mins"
      "#{minutes} #{minutes_label} read"
    end
  end
  
  Liquid::Template.register_filter(ReadingTimeFilter)