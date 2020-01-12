---
path: "/blog/guide-facebook-insights-api-2"
date: "2020-01-21"
title: "Guide to Facebook Insights API (Part 2)"
tags: ["facebook", "marketing", "api", "insights", "martech"]
---

# Introduction
Welcome to the first article published in 2020! Friendly reminder that this is the second part of a guide around how to use Facebook Insights API with Python so if you haven't seen [Guide to Facebook Insights API](/blog/guide-facebook-insights-api) (Part 1) yet I would suggest to read it first.

Some of the more advanced features of Facebook Insights API weren't covered in Part 1 so here is the rest!

# Advanced queries to the Facebook Insights API
## Level
In the [previous article](/blog/guide-facebook-insights-api), we saw how to get results for an ad account, campaign, ad set, etc... But the results were only for the total sum of that entity. What if you want to access your entire account results, but detailed by campaign or even ad set?

This is how "level" comes into consideration.

Here is a sample code for account results at the campaign level that should be familiar from [my previous article](/blog/guide-facebook-insights-api).

```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

app_id = 'REPLACE_BY_YOUR_APP_ID'
app_secret = 'REPLACE_BY_YOUR_APP_SECRET'
access_token = 'REPLACE_BY_YOUR_ACCESS_TOKEN'

FacebookAdsApi.init(app_id, app_secret, access_token)

params = {
    'level': 'campaign', # <== level mechanism
}

fields = [
    'campaign_name',
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Notice how I added `campaign_name` to the list of fields in order to differentiate each campaign.

Result:
```python
[<AdsInsights> {
    "campaign_name": "campaign_a",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "9501.20"
}, <AdsInsights> {
    "campaign_name": "campaign_b",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "22702.47"
}, <AdsInsights> {
    "campaign_name": "campaign_c",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "11404.52"
}, <AdsInsights> {
    "campaign_name": "campaign_d",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "8752.67"
}]
```

As you can see, the results don't seem to be sorted in any way. Follow the next section to learn how to sort results.

## Sorting
You might have noticed that Facebook results have usually no particular order. Here is how to specify a sort so the JSON result is already sorted when you get the result back from the API.

Here's how to do it:

Add a `sort` param in your list of params. As it's possible to sort by multiple fields, the parameter is an array of strings. The strings are constructed using `{field}_{direction}`, `field` being the field you want to sort by and `direction` being either `ascending` or `descending`.

Example: `spend_descending` to sort results by spend, from highest to lowest.

### Sample code:
```python
(...)

params = {
    'level': 'campaign',
    'sort': ['spend_descending'], # <== sorting mechanism
}

fields = [
    'campaign_name',
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "campaign_name": "campaign_b",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "22702.47"
}, <AdsInsights> {
    "campaign_name": "campaign_c",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "11404.52"
}, <AdsInsights> {
    "campaign_name": "campaign_a",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "9501.20"
}, <AdsInsights> {
    "campaign_name": "campaign_d",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "8752.67"
}]
```

Results are now sorted by spend, in a descending order (from highest to lowest)!

## Filtering
Filtering is constructed through a field (the field or column we'd like to filter on, for example `campaign.name` or `impressions`), an operator (for example `CONTAIN` or `STARTS_WITH` for string fields like entity names, or `GREATER_THAN` // `LESS_THAN` for number fields like impressions) and a value (what we want to filter against, for example "5000" to only get campaigns that have spent over $5,000).

They can be combined into one or multiple objects under the `filtering` parameter.

The exhaustive list of operators:
* `EQUAL`
* `NOT_EQUAL`
* `GREATER_THAN`
* `GREATER_THAN_OR_EQUAL`
* `LESS_THAN`
* `LESS_THAN_OR_EQUAL`
* `IN_RANGE`
* `NOT_IN_RANGE`
* `CONTAIN`
* `NOT_CONTAIN`
* `IN`
* `NOT_IN`
* `STARTS_WITH`
* `ANY`
* `ALL`
* `AFTER`
* `BEFORE`
* `NONE`

Here are a few examples:

### Filtering by spend
```python
(...)

params = {
    'filtering': [
        {
            'field': 'spend',
            'operator': 'GREATER_THAN',
            'value': 20000,
        },
    ],
    'level': 'campaign',
}'

fields = [
    'campaign_name',
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "campaign_name": "campaign_b",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "22702.47"
}]
```
^ Only fetched the campaigns with >$20,000 spend

### Filtering by campaign name
```python
(...)

params = {
    'filtering': [
        {
            'field': 'campaign.name',
            'operator': 'CONTAIN',
            'value': '_c',
        },
    ],
    'level': 'campaign',
}'

fields = [
    'campaign_name',
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "campaign_name": "campaign_c",
    "date_start": "2019-12-13",
    "date_stop": "2020-01-11",
    "spend": "11404.52"
}]
```
^ Only fetched campaign with `_c` in the name

Note that your intuition might be to use `campaign_name` as a field but if you do so you'll get an error back from Facebook:
`Filter campaign_name is not valid any more, please use campaign.name instead`.

## Time increment (monthly or daily data)
By default, the Facebook Insights API will give the result for the total of the date range (`all_days`).

If you want to have the data for every month or every day (monthly or daily data), you have to use the `time_increment` parameter.

`time_increment` can either be:
* an integer (if you want data by groups of 1, 2, 3... days, not sure why you would need to do groups of more than 1 day outside of weekly/monthly data, but please [contact me](/about) if you do so that I can learn about your use case)
* `monthly`
* `all_days` (but that's the default)

### Daily data sample:
```python
(...)

params = {
    'time_increment': 1, # <== daily data mechanism
    'date_preset': 'last_3d',
}

fields = [
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Results:
```python
[<AdsInsights> {
    "date_start": "2020-01-09",
    "date_stop": "2020-01-09",
    "spend": "8000.00"
}, <AdsInsights> {
    "date_start": "2020-01-10",
    "date_stop": "2020-01-10",
    "spend": "8200.00"
}, <AdsInsights> {
    "date_start": "2020-01-11",
    "date_stop": "2020-01-11",
    "spend": "10000.00"
}]
```

### Monthly data sample:
```python
(...)

params = {
    'time_increment': 'monthly', # <== monthly data
    'date_preset': 'last_quarter',
}

fields = [
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "date_start": "2019-10-01",
    "date_stop": "2019-10-31",
    "spend": "100000.00"
}, <AdsInsights> {
    "date_start": "2019-11-01",
    "date_stop": "2019-11-30",
    "spend": "125000.00"
}, <AdsInsights> {
    "date_start": "2019-12-01",
    "date_stop": "2019-12-31",
    "spend": "150000.00"
}]
```

## Breakdowns
All of this is fine and dandy but what if you want to break down your results by something like publisher platform (Facebook/Instagram/Messenger...), age, country and more?

Once again, one simply needs to add `breakdowns` as a param with a list of breakdown.

Here is the exhaustive list of available breakdowns:
* `ad_format_asset`
* `age`
* `body_asset`
* `call_to_action_asset`
* `country`
* `description_asset`
* `gender`
* `image_asset`
* `impression_device`
* `link_url_asset`
* `product_id`
* `region`
* `title_asset`
* `video_asset`
* `dma`
* `frequency_value`
* `hourly_stats_aggregated_by_advertiser_time_zone`
* `hourly_stats_aggregated_by_audience_time_zone`
* `place_page_id`
* `publisher_platform`
* `platform_position`
* `device_platform`

Only some breakdowns can be combined. To know more about it, please refer to [Facebook's official documentation about combining breakdowns](https://developers.facebook.com/docs/marketing-api/insights/breakdowns#combiningbreakdowns).

### Age breakdown sample:
```python
(...)

params = {
    'breakdowns': ['age'], # <== breakdown mechanism
    'date_preset': 'last_7d',
}

fields = [
    'impressions',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "age": "18-24",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "78505"
}, <AdsInsights> {
    "age": "25-34",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "82575"
}, <AdsInsights> {
    "age": "35-44",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "32155"
}, <AdsInsights> {
    "age": "45-54",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "18055"
}, <AdsInsights> {
    "age": "55-64",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "10316"
}, <AdsInsights> {
    "age": "65+",
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "6243"
}]
```

### Publisher platform breakdown sample:
```python
(...)

params = {
    'breakdowns': ['publisher_platform'], # <== breakdown mechanism
    'date_preset': 'last_7d',
}

fields = [
    'impressions',
]

insights = AdAccount('act_****************').get_insights(
    params = params,
    fields = fields,
)

print(insights)
```

Result:
```python
[<AdsInsights> {
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "3458",
    "publisher_platform": "audience_network"
}, <AdsInsights> {
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "401304",
    "publisher_platform": "facebook"
}, <AdsInsights> {
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "104504",
    "publisher_platform": "instagram"
}, <AdsInsights> {
    "date_start": "2020-01-14",
    "date_stop": "2020-01-20",
    "impressions": "154",
    "publisher_platform": "messenger"
}]
```

# Conclusion
This is it for today, we've covered most of what's available in Facebook Insights API. Thank you for following along!

Refer to [Facebook's official documentation about Insights](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights) for full coverage of all options available.

Do not hesitate to [contact me](/about) with any questions about the article.
