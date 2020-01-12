---
path: "/blog/guide-facebook-insights-api"
date: "2019-07-14"
title: "Guide to Facebook Insights API"
tags: ["facebook", "marketing", "api", "insights", "martech"]
---

# What is the Facebook Insights API?
The Facebook Insights API is what allows us to query results from the Facebook Marketing platform.
It basically includes any kind of statistic that you can find in the Facebook's Ads Manager.

Following [Getting Started with Facebook Marketing API](/blog/getting-started-with-facebook-marketing-api)'s article, we'll use the `facebook-python-business-sdk` Python package. Please refer to that article in order to get your `app id`, `app secret` and `access token`.

Note: I will be replacing confidential information with asterisks (`*`) in the code samples below.

# Basic data fetching
## Account-level data fetching
The most basic way to get "insights" from the Facebook API looks like this:
```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

app_id = 'REPLACE_BY_YOUR_APP_ID'
app_secret = 'REPLACE_BY_YOUR_APP_SECRET'
access_token = 'REPLACE_BY_YOUR_ACCESS_TOKEN'

FacebookAdsApi.init(app_id, app_secret, access_token)

insights = AdAccount('act_****************').get_insights()

print(insights)
```

But as you can see, we didn't specify any date range, columns or breakdowns.
Facebook automatically picks the last 30 days date range, impressions and spend columns with no breakdown.

Result:
```python
[<AdsInsights> {
    "account_id": "****************",
    "date_start": "2019-04-13",
    "date_stop": "2019-05-12",
    "impressions": "*****",
    "spend": "****.**"
}]
```

Also note that the highest level of insights one can get from the Facebook API is at the account level.
If you manage multiple accounts and would like to aggregate the spend among all accounts, you'll have to query every account manually and sum it up yourself.

## Other level data fetching
Getting campaign-level insights instead is really easy. We simply need to swap the `AdAccount` ad object for `Campaign`.
```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.campaign import Campaign

app_id = 'REPLACE_BY_YOUR_APP_ID'
app_secret = 'REPLACE_BY_YOUR_APP_SECRET'
access_token = 'REPLACE_BY_YOUR_ACCESS_TOKEN'

FacebookAdsApi.init(app_id, app_secret, access_token)

insights = Campaign('*****************').get_insights()

print(insights)
```

Result:
```python
[<AdsInsights> {
    "account_id": "****************",
    "campaign_id": "******************",
    "date_start": "2019-05-03",
    "date_stop": "2019-06-01",
    "impressions": "*****",
    "spend": "****.**"
}]
```

Notice how the `campaign_id` is now mentioned in the result.

For ad set level and ad level data, import `AdSet` or `Ad` from `facebook_business.adobjects.adset` and `facebook_business.adobjects.ad` respectively and use `AdSet(<AdSetID>).get_insights()` or `Ad(<AdID>).get_insights()` to fetch your insights.

# Customizing date ranges, fields, sorting and more
The queries listed above are fine but you probably want to get data from specific time ranges and for particular fields! This is what we'll cover in this section.

## Customizing the date range
### Using date presets
Facebook offers a long list of different date presets that should cover a lot of use cases:
- `today`
- `yesterday`
- `last_3d`
- `last_7d`
- `last_14d`
- `last_28d`
- `last_30d`
- `last_90d`
- `this_week_mon_today`
- `this_week_sun_today`
- `last_week_mon_sun`
- `last_week_sun_sat`
- `this_month`
- `last_month`
- `this_quarter`
- `last_quarter`
- `this_year`
- `last_year`
- `lifetime`

Those date presets can be passed as parameters to our `get_insights()` query, see below as an example with `last_7d`:
```python
(...)

params = {'date_preset': 'last_7d'}

insights = AdAccount('act_****************').get_insights(params = params)

print(insights)
```

The results will now only include data from the last 7 days 😊

### Using a time range
If you want data from a specific time range not included in the presets above, you can also use a `since` date and an `until` date, with dates in the YYYY-MM-DD format.

```python
(...)

params = {'time_range': {'since': '2019-01-01', 'until': '2019-01-05'}}

insights = AdAccount('act_****************').get_insights(params = params)

print(insights)
```

You can confirm the query is working as the result includes a `date_start` and `date_stop`:
```python
[<AdsInsights> {
    "account_id": "****************",
    "date_start": "2019-01-01",
    "date_stop": "2019-01-05",
    "impressions": "*******",
    "spend": "*****.**"
}]
```

## Customizing the fields
### Common fields
In the same manner that we can pass different parameters to the `get_insights()` query, we can pass `fields` which is a list of the different fields we want to get from the Facebook Insights API. A complete list can be found in the [Facebook's official documentation about parameters and fields](https://developers.facebook.com/docs/marketing-api/insights/parameters). Here is an example with common fields most marketers would like to get:

```python
(...)

params = {'date_preset': 'last_7d'}

fields = [
    'account_name',
    'impressions',
    'clicks',
    'cpm',
    'ctr',
    'spend',
]

insights = AdAccount('act_****************').get_insights(
    params = params, fields = fields
)

print(insights)
```

And the result now includes the additional fields:
```python
[<AdsInsights> {
    "account_name": "Damien Gonot tutorial account",
    "clicks": "*****",
    "cpm": "4.50",
    "ctr": "1.50",
    "date_start": "2019-07-07",
    "date_stop": "2019-07-13",
    "impressions": "*******",
    "spend": "*****.**"
}]
```

### Actions / Conversions and Cost per Action (CPA)
Getting conversion data is a bit weird using Facebook Insights API, you have to include `actions` in the list of fields and it will return the entire list of actions that Facebook tracks. Here is an example:
```python
(...)

params = {'date_preset': 'last_7d'}

fields = [
    'account_name',
    'impressions',
    'clicks',
    'cpm',
    'ctr',
    'spend',
    'actions',
]

insights = AdAccount('act_****************').get_insights(
    params = params, fields = fields
)

print(insights)
```

And the result:
```python
[<AdsInsights> {
    "account_name": "Damien Gonot tutorial account",
    "actions": [
        (...)
        {
            "action_type": "comment",
            "value": "****"
        },
        {
            "action_type": "link_click",
            "value": "******"
        },
        {
            "action_type": "mobile_app_install",
            "value": "*****"
        },
        {
            "action_type": "app_custom_event.fb_mobile_search",
            "value": "******"
        },
        {
            "action_type": "app_custom_event.fb_mobile_add_to_cart",
            "value": "*****"
        },
        {
            "action_type": "app_custom_event.fb_mobile_add_to_wishlist",
            "value": "*****"
        },
        (...)
]
```

Depending on your conversion setup, you'll get different results. To calculate your CPA (Cost per Action), you can either calculate it yourself or use Facebook's calculated CPA.

First of all, getting the spend is pretty straightforward once you realize the `AdsInsights` object is in a list:
```python
spend = insights[0]['spend']
```

Getting the action count is a bit trickier as `actions` is a list of objects. I'll try to find `mobile_app_installs` as an example, replace with any action name you would like to get:
```python
mobile_app_installs = next(action for action in insights[0]['actions'] if action['action_type'] == 'mobile_app_install')['value']
```

Tying everything together knowing that numbers returned by Facebook Insights API are actually strings:

```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

app_id = 'REPLACE_BY_YOUR_APP_ID'
app_secret = 'REPLACE_BY_YOUR_APP_SECRET'
access_token = 'REPLACE_BY_YOUR_ACCESS_TOKEN'

FacebookAdsApi.init(app_id, app_secret, access_token)

params = {'date_preset': 'last_7d'}

fields = [
    'account_name',
    'impressions',
    'clicks',
    'cpm',
    'ctr',
    'spend',
    'actions',
]

insights = AdAccount('act_****************').get_insights(
    params = params, fields = fields
)

spend = insights[0]['spend']
mobile_app_installs = next(action for action in insights[0]['actions'] if action['action_type'] == 'mobile_app_install')['value']
cpa = float(spend)/int(mobile_app_installs)
print('CPA:', round(cpa, 2))
```

That's all for now but there are still a few details to cover:
- an alternative way to fetch CPA
- calculating ROAS (Return on Ad Spend)
- sorting the results
- getting the data on different levels
- breakdown by time/day and other factors
- attribution windows

Thank you for reading and stay tuned for part 2! Do not hesitate to [contact me](/about) in the meantime if you have any questions.
